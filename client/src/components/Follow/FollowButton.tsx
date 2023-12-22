import { storage } from "@/global/storage";
import { useFollow } from "./Follow.hooks";
import toast from "react-hot-toast";
import ApiBoundary from "../common/ApiBoundary";

export default function FollowButton({ userId }: { userId: string }) {
  return (
    <ApiBoundary>
      <ApiComponent userId={userId} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId }: { userId: string }) {
  const { checkFollow, postFollow, deleteFollow } = useFollow(userId);
  const currentUser = storage.get("currentUser");

  const renderFollowButton = () => {
    if (!currentUser) {
      return (
        <input
          type="button"
          value="팔로우"
          onClick={() => {
            toast.error("팔로우하려면 로그인해주세요");
          }}
        />
      );
    }

    if (currentUser && currentUser.userId === userId) {
      return null;
    }

    if (!checkFollow) {
      return (
        <input
          type="button"
          value="팔로우"
          onClick={async () => {
            const res = await postFollow({
              follower: userId,
            });
            console.log(res);
          }}
        />
      );
    }

    if (checkFollow) {
      return (
        <input
          type="button"
          value="팔로우 취소"
          onClick={async () => {
            const res = await deleteFollow(userId);
            console.log(res);
          }}
        />
      );
    }
  };
  const FollowButton = () => <div>{renderFollowButton()}</div>;

  return <FollowButton />;
}

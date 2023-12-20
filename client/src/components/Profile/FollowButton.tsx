import { storage } from "@/global/storage";
import { useFollow } from "./Follow.hooks";
import toast from "react-hot-toast";

export default function FollowButton({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const { checkFollow, postFollow, deleteFollow } = useFollow(currentUserId);
  const localUserData = storage.get("currentUser");

  const renderFollowButton = () => {
    if (!localUserData) {
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

    if (localUserData && JSON.parse(localUserData).userId === currentUserId) {
      return null;
    }

    if (!checkFollow) {
      return (
        <input
          type="button"
          value="팔로우"
          onClick={async () => {
            const res = await postFollow({
              follower: currentUserId,
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
            const res = await deleteFollow(currentUserId);
            console.log(res);
          }}
        />
      );
    }
  };
  const FollowButton = () => <div>{renderFollowButton()}</div>;

  return <FollowButton />;
}

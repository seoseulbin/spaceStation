import { storage } from "@/global/storage";
import { useFollow } from "./Follow.hooks";
import toast from "react-hot-toast";
import ApiBoundary from "../common/ApiBoundary";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/global/constants";

export default function FollowButton({ userId }: { userId: string }) {
  return (
    <ApiBoundary>
      <ApiComponent userId={userId} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const { checkFollow, postFollow, deleteFollow } = useFollow(userId);
  const currentUser = storage.get("currentUser");
  const isLoggedIn = !!currentUser;
  const isCurrentUser = currentUser && currentUser.userId === userId;

  const handleFollowClick = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("팔로우하려면 로그인해주세요");
        navigate(PATH.login);
        return;
      }

      if (isCurrentUser) {
        return; // Do nothing if trying to follow oneself
      }

      if (!checkFollow) {
        await postFollow({ follower: userId });
      } else {
        await deleteFollow(userId);
      }
    } catch (error) {
      console.error("Error handling follow:", error);
    }
  };

  return (
    <div>
      {!isCurrentUser && (
        <input
          type="button"
          value={checkFollow ? "팔로잉" : "팔로우"}
          className={checkFollow ? "cancel" : "follow"}
          onClick={handleFollowClick}
        />
      )}
    </div>
  );
}

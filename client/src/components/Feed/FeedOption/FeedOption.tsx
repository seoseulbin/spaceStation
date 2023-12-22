import { storage, storageKeys } from "@/global/storage";
import { useFeed } from "./FeedOption.hooks";
import * as S from "./FeedOption.styles";
import { Link } from "react-router-dom";
import ApiBoundary from "@/components/common/ApiBoundary";
import toast from "react-hot-toast";
import { PATH } from "@/global/constants";

interface OptionProps {
  feedId: string;
  currentUserId: string;
  isOpen: boolean;
  closeOption: () => void;
}

export default function FeedOption(props: OptionProps) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({
  feedId,
  currentUserId,
  isOpen,
  closeOption,
}: OptionProps) {
  const { deleteFeed } = useFeed();

  const currentUser = storage.get(storageKeys.currentUser);

  return (
    <>
      {isOpen && (
        <S.Container onClick={closeOption}>
          <S.Wrapper>
            {currentUserId === currentUser?.userId ? (
              <>
                <Link to={PATH.upadteFeed(feedId)}>
                  <S.Button>수정</S.Button>
                </Link>

                <S.Button
                  onClick={async () => {
                    if (!confirm("피드를 삭제하시겠습니까?")) {
                      return;
                    }
                    await deleteFeed(feedId); // 피드 id 받아와야함.
                  }}
                >
                  삭제
                </S.Button>
              </>
            ) : (
              <S.Button
                onClick={() => {
                  toast.success("신고되었습니다.");
                }}
              >
                신고하기
              </S.Button>
            )}
          </S.Wrapper>
        </S.Container>
      )}
    </>
  );
}

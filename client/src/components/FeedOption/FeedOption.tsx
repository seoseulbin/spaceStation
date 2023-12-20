import { useFeed } from "./FeedOption.hooks";
import * as S from "./FeedOption.styles";
import { Link } from "react-router-dom";

type OptionType = {
  feedId: string;
  isOpen: boolean;
  closeOption: () => void;
};

export default function FeedOption({
  feedId,
  isOpen,
  closeOption,
}: OptionType) {
  const { deleteFeed } = useFeed();

  return (
    <>
      {isOpen && (
        <S.Container onClick={closeOption}>
          <S.Wrapper>
            <Link to={`/feeds/${feedId}`}>
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
          </S.Wrapper>
        </S.Container>
      )}
    </>
  );
}

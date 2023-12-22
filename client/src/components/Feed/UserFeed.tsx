import { Link } from "react-router-dom";
import { useUserFeed } from "./Feed.hooks";
import * as S from "./Feed.styles";
import { PATH } from "@/global/constants";
import Loading from "../common/Loading";
import ApiBoundary from "../common/ApiBoundary";

type Props = { userId: string };

export default function UserFeed(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ userId }: Props) {
  const { data, setTarget, hasNextPage } = useUserFeed({
    userId,
  });

  return (
    <>
      {data.pages.map(({ data: feeds }, i) => (
        <S.GridFeedItem $column={3} key={"gridFeedItem" + i}>
          {feeds.map((feed) => (
            // TODO: 피드로 이동
            <Link to={PATH.root} key={feed._id}>
              <S.ImageSquareFrame>
                <img src={feed.imgUrls[0].url} alt="피드 이미지" />
              </S.ImageSquareFrame>
            </Link>
          ))}
        </S.GridFeedItem>
      ))}
      {hasNextPage && (
        <div ref={setTarget}>
          <Loading />
        </div>
      )}
    </>
  );
}

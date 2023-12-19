import { Link } from "react-router-dom";
import { useCategoryFeed } from "./Feed.hooks";
import * as S from "./Feed.styles";
import { PATH } from "@/global/constants";
import Loading from "../common/Loading";
import ApiBoundary from "../common/ApiBoundary";

type Props = { category: string };

export default function CategoryFeedWithApiBoundary(props: Props) {
  return (
    <ApiBoundary>
      <CategoryFeed {...props} />
    </ApiBoundary>
  );
}

function CategoryFeed({ category }: Props) {
  const { data, setTarget } = useCategoryFeed({
    category,
  });

  return (
    <>
      {data.pages.map(({ data: feeds }, i) => (
        <S.GridFeedItem $column={2} key={"gridFeedItem" + i}>
          {feeds.map((feed) => (
            // TODO: 피드로 이동
            <Link to={PATH.root} key={feed._id}>
              <S.ImageSquareFrame>
                <img src={feed.imgUrls[0]} alt="피드 이미지" />
              </S.ImageSquareFrame>
            </Link>
          ))}
        </S.GridFeedItem>
      ))}
      <div ref={setTarget}>
        <Loading />
      </div>
    </>
  );
}

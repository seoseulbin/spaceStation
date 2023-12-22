import { Link } from "react-router-dom";
import { useCategoryFeed } from "./Feed.hooks";
import * as S from "./Feed.styles";
import { PATH } from "@/global/constants";
import Loading from "../common/Loading";
import ApiBoundary from "../common/ApiBoundary";
import Category from "./Category/Category";
import Header from "../Header/Header";

type Props = { category: string };

export default function CategoryFeed(props: Props) {
  const handleSearchButton = () => {
    alert("!!?");
  };

  return (
    <ApiBoundary>
      <Header
        backArrow={false}
        headerTitle={"Space-station🚉"}
        isFunctionAcitve={true}
        functionIconType={"search"}
        onClickFunction={handleSearchButton}
      />
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ category }: Props) {
  const { data, setTarget, hasNextPage } = useCategoryFeed({
    category,
  });

  return (
    <>
      <Category categoryId={category} />
      {data.pages.map(({ data: feeds }, i) => (
        <S.GridFeedItem $column={2} key={"gridFeedItem" + i}>
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

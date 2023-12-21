import { Fragment } from "react";
import { useFeed } from "./Feed.hooks";
import FeedItem from "./FeedItem";
import Loading from "../common/Loading";
import ApiBoundary from "../common/ApiBoundary";
import Header from "../Header/Header";

export default function Feed() {
  //TODO : 나중에 검색 기능 추가해야함
  const handleSearchButton = () => {
    alert("!!?");
  };

  return (
    <ApiBoundary>
      <Header
        backArrow={false}
        headerTitle={"Space-station🚉"}
        isFunctionAcitve={true}
        functionTitle={"검색"}
        onClickFunction={handleSearchButton}
      />
      <ApiComponent />
    </ApiBoundary>
  );
}

function ApiComponent() {
  const { data, setTarget } = useFeed();

  return (
    <>
      {data.pages.map(({ data: feeds }) =>
        feeds.map((feed) => (
          <Fragment key={feed._id}>
            <FeedItem {...feed} />
          </Fragment>
        )),
      )}
      <div ref={setTarget}>
        <Loading />
      </div>
    </>
  );
}

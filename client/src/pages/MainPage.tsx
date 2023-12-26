import Category from "@/components/Feed/Category/Category";
import MainFeed from "@/components/Feed/MainFeeds/MainFeed";
import Header from "@/components/Header/Header";
export default function MainPage() {
  //TODO : 나중에 검색 기능 추가해야함
  const handleSearchButton = () => {
    alert("!!?");
  };

  return (
    <>
      <Header
        backArrow={false}
        headerTitle={"Space-station🚉"}
        isFunctionAcitve={true}
        functionIconType={"search"}
        onClickFunction={handleSearchButton}
      />
      <Category categoryId="" />
      <MainFeed />
    </>
  );
}

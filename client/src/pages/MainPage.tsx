import Category from "@/components/Feed/Category/Category";
import MainFeed from "@/components/Feed/MainFeeds/MainFeed";
import MainHeader from "@/components/Header/MainHeader";
export default function MainPage() {
  return (
    <>
      <MainHeader />
      <Category categoryId="" />
      <MainFeed />
    </>
  );
}

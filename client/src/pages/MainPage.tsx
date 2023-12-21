import Category from "@/components/Feed/Category/Category";
import Feed from "@/components/Feed/Feed";
import Navbar from "@/components/Navbar/Navbar";

export default function MainPage() {
  return (
    <>
      <Category categoryId={""} />
      <Feed />
      <Navbar />
    </>
  );
}

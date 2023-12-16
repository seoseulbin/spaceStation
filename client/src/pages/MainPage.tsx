import Comment from "@/components/Comments/Comments";
import Feed from "@/components/Feed/Feed";

export default function MainPage() {
  const feedIds = ["657bbb1f59008937d6e424b8", "657ad9c4b22e76aea1ff6bf4"];

  return (
    <>
      <Comment feedIds={feedIds} />
      <Feed />
    </>
  );
}

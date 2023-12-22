import Feed from "@/components/Feed/Feed";
import Navbar from "@/components/Navbar/Navbar";
import Layout from "./Layout";

export default function MainPage() {
  return (
    <Layout>
      <Feed />
      <Navbar />
    </Layout>
  );
}

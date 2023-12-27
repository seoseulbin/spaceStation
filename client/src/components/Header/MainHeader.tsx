import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { PATH } from "@/global/constants";

export default function MainHeader() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        backArrow={false}
        headerTitle={"Space-station🚉"}
        isFunctionAcitve={true}
        functionIconType={"search"}
        onClickFunction={() => navigate(PATH.search)}
      />
    </>
  );
}

import { SyntheticEvent } from "react";
import * as S from "./Header.styles";
import { IoIosArrowBack } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiSaveLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

interface HeaderType {
  backArrow: boolean;
  headerTitle?: string;
  headerUrl?: string | undefined;
  isFunctionAcitve?: boolean;
  functionIconType?: string | undefined;
  onClickFunction?: (
    e: SyntheticEvent<HTMLDivElement>,
  ) => Promise<void> | void | undefined;
}

export default function Header({
  backArrow,
  headerTitle = "",
  headerUrl,
  isFunctionAcitve,
  functionIconType = "",
  onClickFunction,
}: HeaderType) {
  //뒤로가기 함수
  const handleBackArrowFunction = () => {
    window.history.back();
  };

  const functionIconSetting = (iconType: string) => {
    if (iconType === "dots") {
      return <HiDotsHorizontal size="20" />;
    }
    if (iconType === "search") {
      return <IoSearch size="25" />;
    }
    if (iconType === "upload") {
      return <FiUpload size="20" />;
    }
    if (iconType === "save") {
      return <RiSaveLine size="24" />;
    }
  };

  return (
    <S.Container>
      <S.ContainerLeftDiv>
        {backArrow ? (
          <S.ArrowButtonDiv onClick={handleBackArrowFunction}>
            <IoIosArrowBack size="35" />
          </S.ArrowButtonDiv>
        ) : (
          <></>
        )}
        {headerTitle.length > 0 ? (
          <S.HeaderTitleDiv>{headerTitle}</S.HeaderTitleDiv>
        ) : (
          <S.HeaderTitleDiv>
            <img src={headerUrl} />
          </S.HeaderTitleDiv>
        )}
      </S.ContainerLeftDiv>
      <S.ContainerRightDiv onClick={onClickFunction}>
        {isFunctionAcitve && functionIconSetting(functionIconType)}
      </S.ContainerRightDiv>
    </S.Container>
  );
}

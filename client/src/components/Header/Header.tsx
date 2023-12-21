import { SyntheticEvent } from "react";
import * as S from "./Header.styles";
import { IoIosArrowBack } from "react-icons/io";

interface HeaderType {
  backArrow: boolean;
  headerTitle?: string;
  headerUrl?: string | undefined;
  isFunctionAcitve?: boolean;
  functionTitle?: string | undefined;
  functionTitleColor?: string | undefined;
  onClickFunction?: (e: SyntheticEvent<HTMLDivElement>) => void | undefined;
}

export default function Header({
  backArrow,
  headerTitle = "",
  headerUrl,
  isFunctionAcitve,
  functionTitle,
  functionTitleColor,
  onClickFunction,
}: HeaderType) {
  //뒤로가기 함수
  const handleBackArrowFunction = () => {
    window.history.back();
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
      <S.ContainerRightDiv onClick={onClickFunction} color={functionTitleColor}>
        {isFunctionAcitve && functionTitle}
      </S.ContainerRightDiv>
    </S.Container>
  );
}

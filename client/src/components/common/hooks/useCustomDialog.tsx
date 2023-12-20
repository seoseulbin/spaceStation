import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import * as S from "./useCustomDialog.styles";

/**
 * 커스텀 다이얼로그 Custom Dialog 사용을 위한 메소드와 레이아웃을 정의한 훅 입니다.
 * 메소드는 아래와 같이 사용하고, 불러온 컴포넌트의 return 값에 레이아웃 컴포넌트를 지정하고
 * 마크업을 직접 정의하거나, children props로 템플릿 레이아웃을 할당하여 사용할 수 있습니다.
 *
 * (주의) 한 컴포넌트 안에서는 1개의 dialog만 사용 가능합니다.
 *
 * -- isOpen :
 *   팝업이 열렸는지 판단하는 상태 값 (기본값 : false)
 *   * StyledModal의 "isOpen" props에 할당합니다.
 *
 * -- opacity :
 *   팝업의 투명도 값 (기본값 : 0)
 *   * StyledModal의 "opacity" props에 할당합니다.
 *   * StyledModal의 "backgroundProps" props에 할당합니다.
 *
 * -- toggleDialog :
 *   1) 팝업을 호출할 엘리먼트의 onClick 이벤트에 할당합니다.
 *   2) StyledModal의 "onBackgroundClick", "onEscapeKeydown" props에 할당합니다.
 *   3) 팝업 내부의 요소 중 팝업을 닫을 엘리먼트의 onClick 이벤트에 할당합니다.
 *
 * -- afterOpenDialog :
 *   StyledModal의 "afterOpen" props에 할당합니다.
 *
 * -- beforeCloseDialog :
 *   StyledModal의 "beforeClose" props에 할당합니다.
 */

export function useCustomDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!isOpen) beforeCloseDialog;
    else afterOpenDialog();
  }, [isOpen]);

  function toggleDialog() {
    setIsOpen(!isOpen);
  }

  function afterOpenDialog() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeCloseDialog() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 400);
    });
  }

  function BasicModalLayout({
    title,
    description,
    children,
  }: {
    title: string;
    description?: string | undefined;
    children?: React.ReactNode | undefined;
  }) {
    return (
      <S.BasicModalLayoutStyle>
        <header>
          <h1>{title}</h1>
          <button onClick={toggleDialog}>
            <FiX size={24} />
          </button>
        </header>
        <section>
          <p>{description}</p>
          {children}
        </section>
      </S.BasicModalLayoutStyle>
    );
  }

  function ActionSheetLayout({
    list,
  }: {
    list?:
      | Array<
          [
            {
              name: string;
              usage: string;
              onClick: () => void;
            },
          ]
        >
      | undefined;
  }) {
    return (
      <S.ActionSheetLayoutStyle>
        {list?.map((item, index) => (
          <button key={index} name={item.usage} onClick={item.onClick}>
            {item.name}
          </button>
        ))}
      </S.ActionSheetLayoutStyle>
    );
  }

  return {
    BasicModalLayout, // 기본 모달 레이아웃 입니다. 타이틀, 설명을 입력합니다.
    ActionSheetLayout, // 액션 시트 레이아웃 입니다. string으로 이루어진 배열을 입력합니다.
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  };
}

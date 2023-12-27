import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import * as S from "./useCustomDialog.styles";

/**
 * 커스텀 다이얼로그 Custom Dialog 사용을 위한 메소드와 레이아웃을 정의한 훅 입니다.
 * 메소드는 아래와 같이 사용하고, 다이얼로그 훅을 import한 컴포넌트의 return 값에
 * 다이얼로그 컴포넌트 (S.BasicModal / S.ActionSheet / S.ConfirmPopup)를 지정하고 하위에 마크업을 직접 정의하거나,
 * children props로 템플릿 레이아웃 (S.BasicModalLayout / S.ActionSheetLayout / S.ConfirmPopupLayout)을 할당하여 사용할 수 있습니다.
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
      setTimeout(resolve, 350);
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
    options,
  }: {
    options?:
      | { name: string; usage: string; onClick: () => void }[]
      | undefined;
  }) {
    return (
      <S.ActionSheetLayoutStyle>
        {options?.map((item, index) => (
          <button key={index} name={item.usage} onClick={item.onClick}>
            {item.name}
          </button>
        ))}
      </S.ActionSheetLayoutStyle>
    );
  }

  function ConfirmPopupLayout({
    description,
    buttons,
    children,
  }: {
    description?: React.ReactNode | string;
    buttons?:
      | { name: string; usage: string; onClick: () => void }[]
      | undefined;
    children?: React.ReactNode | undefined;
  }) {
    return (
      <S.ConfirmPopupLayoutStyle>
        <header>
          <h3>{description}</h3>
        </header>
        {children && <div>{children}</div>}
        <footer>
          {buttons?.map((item, index) => (
            <button
              title={item.name}
              key={index}
              name={item.usage}
              onClick={item.onClick}
            >
              {item.name}
            </button>
          ))}
        </footer>
      </S.ConfirmPopupLayoutStyle>
    );
  }

  return {
    BasicModalLayout, // 기본 모달 레이아웃 입니다. 타이틀 (title), 설명(description)을 입력합니다.
    ActionSheetLayout, // 액션 시트 레이아웃 입니다. { name, usage, onClick }으로 이루어진 배열(options)을 입력합니다.
    ConfirmPopupLayout, // 컨펌 팝업 레이아웃 입니다. 설명(description)과 { name, usage, onClick }으로 이루어진 배열(buttons)을 입력합니다.
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  };
}

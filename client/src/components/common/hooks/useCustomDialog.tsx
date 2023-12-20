import { useEffect, useState } from "react";

/**
 * 커스텀 다이얼로그 사용을 위한 메소드를 정의한 훅 입니다.
 * 훅은 아래와 같이 정의하고, 불러온 컴포넌트의 return 값에 StyledModal을 생성하고
 * 마크업을 직접 정의합니다.
 *
 * >> isOpen :
 *   팝업이 열렸는지 판단하는 상태 값 (기본값 : false)
 *   * StyledModal의 "isOpen" props에 할당합니다.
 *
 * >> opacity :
 *   팝업의 투명도 값 (기본값 : 0)
 *   * StyledModal의 "opacity" props에 할당합니다.
 *   * StyledModal의 "backgroundProps" props에 할당합니다.
 *
 * >> toggleDialog :
 *   1) 팝업을 호출할 엘리먼트의 onClick 이벤트에 할당합니다.
 *   2) StyledModal의 "onBackgroundClick", "onEscapeKeydown" props에 할당합니다.
 *   3) 팝업 내부의 요소 중 팝업을 닫을 엘리먼트의 onClick 이벤트에 할당합니다.
 *
 * >> afterOpenDialog :
 *   StyledModal의 "afterOpen" props에 할당합니다.
 *
 * >> beforeCloseDialog :
 *   StyledModal의 "beforeClose" props에 할당합니다.
 *
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
    console.log(isOpen);
  }

  function afterOpenDialog() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeCloseDialog() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return { toggleDialog, afterOpenDialog, beforeCloseDialog, opacity, isOpen };
}

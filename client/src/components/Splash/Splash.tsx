// SplashScreen.js

import React, { useEffect, useState } from "react";
import * as S from "./Splash.styles";

const Splash = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 예시로 2초 후에 스플래시 화면을 숨김
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 1900);

    return () => clearTimeout(timeoutId);
  }, []);

  return isVisible ? (
    <S.SplashContainer>
      <S.SpinDisk src="../disk.png" />

      <S.DoorFrame src="../doorframe.png" />
      <S.Door src="../door.png" />
    </S.SplashContainer>
  ) : null;
};

export default Splash;

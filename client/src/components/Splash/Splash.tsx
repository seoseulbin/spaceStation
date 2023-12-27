import { useEffect, useState } from "react";
import * as S from "./Splash.styles";

const Splash = () => {
  const hasSeenSplash = localStorage.getItem("hasSeenSplash") === "true";
  const [isVisible, setIsVisible] = useState(!hasSeenSplash);

  useEffect(() => {
    localStorage.setItem("hasSeenSplash", "true");

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

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

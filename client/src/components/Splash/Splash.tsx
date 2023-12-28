import { useEffect, useState } from "react";
import * as S from "./Splash.styles";
import { storage } from "../../global/storage";

const Splash = () => {
  const hasSeenSplash = storage.get("hasSeenSplash") === "true";
  console.log(storage.get("hasSeenSplash"));
  const [isVisible, setIsVisible] = useState(hasSeenSplash);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      storage.set("hasSeenSplash", "true");
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

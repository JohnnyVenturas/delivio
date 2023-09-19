import { useEffect } from "react";
import { useNavigation } from "react-router-dom";

export function useLoadingScreen() {
  const navigation = useNavigation();
  const body = document.querySelector("body");
  if (body == null) throw Error("body is null");

    useEffect(() => {
      if (navigation.state === "loading") {
        body.style.opacity="0.5"
        body.style.pointerEvents="none";
        body.style.overflow="hidden";
      }

      return () => {body.style.opacity="1"
        body.style.pointerEvents="initial";
        body.style.overflow="initial";
      };


  }, [navigation.state, body.style])
}

import { useEffect, useRef, useState } from "react";
import { useAsyncValue, useLocation, useNavigation } from "react-router-dom";
import "./LoadingBar.scss";

export default function LoadingBar() {
   const loadingBar = useRef<HTMLDivElement>(null);
   const [widthState, setWidth] = useState(0);

   useEffect(() => {
      setTimeout(() => {
         if(widthState >= 75) {
            setWidth(75);
            return;
         }

         if(widthState >= 60) {
         setWidth(widthState + 2);
         return;
         }
         setWidth(widthState + 10);
      }, 100);
   })


      return (
         <div
            className="loading-bar"
            ref={loadingBar}
            aria-expanded="true"
            style={{ width: `${widthState}%` }}
         />
      );

}

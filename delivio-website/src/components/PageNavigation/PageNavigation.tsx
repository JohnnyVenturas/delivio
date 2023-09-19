import "./PageNavigation.scss";
import { useEffect, useRef, useState } from "react";
import { Form, Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { convertToObject } from "typescript";
export declare interface IISliderButton {
   page?: string;
   handleClick?: React.MouseEventHandler<HTMLButtonElement>;
   parentRef?: React.RefObject<HTMLDivElement>;
   className?: string;
   mainSearch?: string;
   search?: string;
}
const SliderButton = function (props: IISliderButton) {
   const { page } = props;
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();

   return (
      <button
         type="submit"
         className={`slider-button text-style-heading-50 ${props.className}`}
         onClick={() => {
            navigate({
               search: `?mainSearch=${searchParams.get("mainSearch")||""}&pageNumber=${page}`,
            });
         }}
      >
         {page}
      </button>
   );
};

function handlePages(currentPage: number, maxPage:number) {
   const range = 2;
   const defaultStart = 1;
   const start = Math.max(currentPage - Math.floor(range), 1);
   const finish = Math.min(currentPage + range, maxPage);
   const ranges: number[] | string[] = Array.from(
      { length: finish - start + 1 },
      (_, idx) => start + idx
   );
   if (start > defaultStart) {
      return [...ranges.map((val) => val.toString())];
   }
   return [...ranges.map((val) => val.toString())];
}

export default function PageSlider({maxPage} : {maxPage:number}) {
   const [currentPage, setCurrentPage] = useState(1);
   const [pagesState, setPagesState] = useState(handlePages(currentPage, maxPage));
   const ref = useRef<HTMLDivElement>(null);
   const navigate = useNavigate();
   const location = useLocation();
   const [search, setSearch] = useState("");

   function handleClick(page: string) {
      const pageNumber = Number(page);
      if (isNaN(pageNumber)) return;

      setPagesState(handlePages(pageNumber, maxPage));
      setSearch(`?mainSearch=${new URLSearchParams(location.search).get("mainSearch") || ""}`);
   }
   const value = new URLSearchParams(location.search).get("mainSearch") || "";
   const [searchParams, _] = useSearchParams();
   useEffect(() => {
      setCurrentPage(parseInt(searchParams.get("pageNumber") || "1"));
      setPagesState(handlePages(currentPage, maxPage));
   }, [searchParams, currentPage, maxPage]);
   return (
      <div className="store-header-slider text-style-heading-30 " ref={ref}>
         <button type="button" onClick={
            () => {
               navigate({search: `?mainSearch=${searchParams.get("mainSearch")||""}&pageNumber=1`});
            }} className="text-style-heading-40">
         Prima Pagina</button>


         {pagesState.map((page: string, idx: number) => {
            const className = page === String(currentPage) ? "clr-primary-500" : "";
            return (
               <SliderButton
                  key={`${idx}`}
                  page={page}
                  handleClick={() => handleClick(page)}
                  parentRef={ref}
                  className={className}
                  mainSearch={value}
                  search={search}
               />
            );
         })}
         <button type="button" onClick={
            () => {
               navigate({search: `?mainSearch=${searchParams.get("mainSearch")||""}&pageNumber=${maxPage}`});
            }} className="text-style-heading-40">
         Ultima Pagina</button>
      </div>
   );
}

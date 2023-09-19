import Header from "../../components/Header/Header"
import { StoreHelper } from "../../components/StoreHelper/StoreHelper"
import { StoreGrid, StoreGridFallback } from "../../components/StoreGrid/StoreGrid"
import PageSlider from "../../components/PageNavigation/PageNavigation"
import { IIDataItem } from "../../components/Utils/utils.d"
import { Await, defer, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Suspense, useEffect } from "react"
import { loadData } from "../../DataLoading/getData"
interface II_StoreLoader {
  res: Promise<Array<IIDataItem[]>>;
  searchPara: string | null;
  maxPage: number;
}
export async function loader(loaderParams: LoaderFunctionArgs) {
   
  const request = loaderParams.request;
  const url = new URL(request.url);
  const searchPara = new URL(request.url).searchParams.get("mainSearch") || "";
  const pageId = parseInt(url.searchParams.get("pageNumber") || "1");

  const response = loadData({ search: searchPara, productsPerPage: 50 }, pageId);

  return defer({
    res: response.then((data) => data.page).catch(console.log),
    maxPage: await response.then((data) => data.maxPage).catch(console.log),
    searchPara: searchPara,
  });
}

export default function Store() {
      

  const defferedData = useLoaderData() as II_StoreLoader;
  const searchPara = defferedData.searchPara;
  useEffect(() => {
    if (searchPara == null) return;
    if (document.getElementById("mainSearch") == null) return;
    (document.getElementById("mainSearch") as HTMLInputElement).value = searchPara;
  }, [searchPara]);
   return (
     <>
      <StoreHelper />
      <Suspense
        fallback={
          <>
            <StoreGridFallback />
          </>
        }
      >
        <Await resolve={defferedData.res}>{(data) => <StoreGrid itemArray={data} />}</Await>
        <Await resolve={defferedData.maxPage}>{(data) => <PageSlider maxPage={data} />}</Await>
      </Suspense>
      </>
   ) 
}

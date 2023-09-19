import { OrangeBasket } from "../SVGComponents/SVG";
import { sizes } from "../Utils/utils";
import "./StoreGrid.scss";

import { IIDataItem } from "../Utils/utils.d";
import PageSlider from "../PageNavigation/PageNavigation";
import { lazy, memo, Suspense, useMemo, useState } from "react";
import { StoreItemFallback } from "../StoreItem/StoreItem";
import { Await } from "react-router-dom";
import LoadingBar from "../LoadingBar/LoadingBar";

export const StoreGrid = memo(
  ({
    itemArray,
    defaultBehaviour = true,
  }: {
    itemArray: IIDataItem[];
    defaultBehaviour?: Boolean;
  }) => {
    const widthStyle = { width: defaultBehaviour ? "" : "90%" };
    const StoreItem = lazy(() => import("../StoreItem/StoreItem"));

    return (
      <Suspense
        fallback={
          <>
            <LoadingBar />
            <StoreGridFallback />
          </>
        }
      >
        <div className="store-grid" style={widthStyle}>
          {itemArray.map((entry: IIDataItem, idx) => {
            const props = {
              id: entry.id,
              category: entry.category,
              height: entry.height,
              length: entry.length,
              section: entry.section,
              price : entry.price,
              name : entry.name
            };

            return (
              <Await resolve={entry} key={entry.id + idx}>
                <Suspense
                  fallback={
                    <>
                      <StoreItemFallback />
                    </>
                  }
                >
                  <StoreItem
                    image={entry.image}
                    {...props}
                    svg_component=<OrangeBasket width={sizes.intermediateSize} />
                  />
                </Suspense>
              </Await>
            );
          })}
        </div>
      </Suspense>
    );
  }
);

export function StoreGridFallback({ defaultBehaviour = true }: { defaultBehaviour?: Boolean }) {
  const widthStyle = { width: defaultBehaviour ? "" : "90%" };
  return (
    <>
      <div className="store-grid" style={widthStyle}>
        {Array.from({ length: 50 }).map(() => {
          return (
            <Suspense fallback={<StoreItemFallback />}>
              <StoreItemFallback />
            </Suspense>
          );
        })}
      </div>
    </>
  );
}

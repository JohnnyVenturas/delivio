import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Store, { loader as storeLoader } from "./routes/StorePage/Store";
import ProductPage from "./components/ProductPage/ProductPage";
import { loader as productPageLoader } from "./components/ProductPage/ProductPage";
import Header from "./components/Header/Header";
import { rootLoader } from "./routes/Root";
import BasketPage, { loader } from "./routes/Basket/Basket";
import { loader as BasketLoader } from "./routes/Basket/Basket";
import { action as BasketAction } from "./routes/Basket/Basket";
import { action as destroyAction } from "./routes/Basket/Destroy/Destroy";
import { action as addAction } from "./routes/Basket/Add/Add";
import Checkout from "./routes/Checkout/Checkout";
import Empty from "./routes/Basket/Empty/Empty";
import { loader as emptyLoader } from "./routes/Basket/Empty/Empty";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Muie</div>,
    loader: rootLoader,
  },

  {
    path: "/Magazin",
    element: <Root />,
    children: [
      {
        path: "/Magazin",
        element: <Store />,
        loader: storeLoader,
      },
      {
        path: "/Magazin/:storeId",
        loader: productPageLoader,
        errorElement: <div>Muie</div>,
        element: <ProductPage />,
      },
      {
        path: "/Magazin/Cos",
        loader: BasketLoader,
        action: BasketAction,
        element: <BasketPage />,
        children: [
          {
            path: "/Magazin/Cos/Sterge/:id",
            action: destroyAction,
            element: <></>,
          },
          {
            path: "/Magazin/Cos/add/:id",
            action: addAction,
            element: <></>,
          },
          {
            path: "/Magazin/Cos/Cur",
            element: (
              <Empty headingText="Te-ar putea interesa si urmatoarele produse" subHeadingText="" />
            ),
            loader: emptyLoader,
          },
        ],
      },
      {
        path: "/Magazin/Cos/Gol",
        element: <Empty />,
        loader: emptyLoader,
      },
      {
        path: "/Magazin/Checkout",
        element: <Checkout />,
        loader: storeLoader,
        children: [
          {
            path: "/Magazin/Checkout/Cos",
            element: <BasketPage />,
            loader: BasketLoader,
            action: BasketAction,
            children: [
              {
                path: "/Magazin/Checkout/Cos/Sterge/:id",
                action: destroyAction,
                element: <></>,
              },
              {
                path: "/Magazin/Checkout/Cos/add/:id",
                action: addAction,
                element: <></>,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/Magazin/Categorii/:category",
    element: <Root />,
    loader: storeLoader,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

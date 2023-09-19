import "./Root.scss"
import {
  Outlet,
  redirect,
  ScrollRestoration,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "./Footer/Footer";
export async function rootLoader() {
  return redirect("/Magazin/");
}

export default function Root() {
  return (
    <>
      <ScrollRestoration/>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

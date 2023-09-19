import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getTotalItems } from "../../DataLoading/getData";
import {
  Account,
  Basket,
  Enter,
  Exit,
  LocationPinPoint,
  OrangeArrow,
  Whatsapp,
} from "../SVGComponents/SVG";
import Button from "../Utils/Button";
import { sizes } from "../Utils/utils";
import "./Header.scss";

export default function Header() {
  const sizes = {
    smallerSize: "var(--sz-40)",
    intermediateSize: "var(--sz-50)",
    defaultSize: "var(--sz-60)",
    largerSize: "var(--sz-70)",
  };

  const exitButton = useRef<HTMLButtonElement>(null);
  const enterButton = useRef<HTMLButtonElement>(null);
  const menuWrapper = useRef<HTMLDivElement>(null);
  const body = document.querySelector("body");

  function handleEnter() {
    if (exitButton == null) return;
    if (enterButton == null) return;
    if (menuWrapper == null) return;
    let visibility = enterButton.current?.getAttribute("aria-expanded");
    if (visibility === "true") {
      enterButton.current?.setAttribute("aria-expanded", "false");
      exitButton.current?.setAttribute("aria-expanded", "true");
      menuWrapper.current?.setAttribute("aria-expanded", "true");
      body?.classList.add("overflow-hidden");
    }
  }

  function handleExit() {
    if (exitButton == null) return;
    if (enterButton == null) return;
    if (menuWrapper == null) return;
    let visibility = exitButton.current?.getAttribute("aria-expanded");
    console.log(visibility);
    if (visibility === "true") {
      enterButton.current?.setAttribute("aria-expanded", "true");
      exitButton.current?.setAttribute("aria-expanded", "false");
      menuWrapper.current?.setAttribute("aria-expanded", "false");
      body?.classList.remove("overflow-hidden");
    }
  }

  return (
    <div className="header">
      <nav className="header-nav-desktop">
        <span className="header-title text-style-heading-60">DELIVIO</span>
        <ul className="header-middle-section">
          <Button link="/Despre Noi" link_name="DESPRE NOI" />
          <Button
            link="/Magazin"
            link_name="MAGAZIN"
          />
          <Button link="/Adresa" link_name="ADRESA" />
        </ul>

        <ul className="header-right-section clr-primary-400">
          <Account width={sizes.intermediateSize} />
          <BasketSmartIcon />
          <Whatsapp width={sizes.intermediateSize} />
        </ul>
      </nav>

      <nav className="header-nav-mobile">
        <span className="header-title text-style-heading-70 clr-primary-500 ">DELIVIO</span>
        <div className="header-nav-mobile-importants">
          <BasketSmartIcon />
          <Whatsapp width={sizes.intermediateSize} />
          <button
            ref={enterButton}
            type="button"
            className="enter"
            aria-controls="header-nav-mobile-wrapper"
            aria-expanded="true"
            onClick={handleEnter}
          >
            <Enter width={"40px"} />
          </button>
        </div>
        <div
          id="header-nav-mobile-wrapper"
          ref={menuWrapper}
          className="header-nav-mobile-wrapper"
          aria-expanded="false"
        >
          <button
            ref={exitButton}
            type="button"
            aria-controls="header-nav-mobile-wrapper"
            className="exit"
            onClick={handleExit}
          >
            <span className="text-style-heading-50 clr-primary-400"> Delivio </span>
            <Exit width={sizes.intermediateSize} />
          </button>
          <div className="header-nav-mobile-sections clr-primary-500">
            <Button link="/Despre Noi" link_name="DESPRE NOI" className="text-style-heading-70" />
            <Button
              link="/Adresa"
              link_name="ADRESA"
              className="text-style-heading-70"
              svg_component=<LocationPinPoint />
            />
            <Button
              link="/Magazin"
              onClick={handleExit}
              link_name="Magazin"
              className="text-style-heading-70"
              svg_component=<OrangeArrow width={sizes.intermediateSize} />
            />
            <Button
              link="/LoginPage"
              link_name="Connect"
              svg_component=<Account width={sizes.largerSize} />
              className="text-style-heading-70"
            />
          </div>
          <button type="button" className="header-show-products" onClick={handleExit}>
            <span className=" header-show-products-text text-style-heading-60 clr-primary-100 ">
              Afiseaza Produse
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function BasketSmartIcon() {
  const [total, setTotal] = useState(0);
  const totalSize = useCallback(async () => {
    const data = await getTotalItems();
    setTotal(data);
    console.log(data);
    return data;
  }, []);

  useEffect(() => {
    totalSize();
  }, [totalSize]);

  return <Basket width={sizes.intermediateSize} />;
}

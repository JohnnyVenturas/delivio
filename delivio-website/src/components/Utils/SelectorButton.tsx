import { useRef } from "react";
import {
  ArrowDown,
  ArrowDownDarkerColor,
  BlackExit,
  Exit,
  NiceArrowDown,
} from "../SVGComponents/SVG";
import "./SelectorButton.scss";
import { sizes } from "./utils";

interface II_Category {
  text?: string;
  svg_component?: JSX.Element;
  className?: string;
}
export default function SelectorButton(props: II_Category) {
  const button = useRef<HTMLButtonElement>(null);
  const exitButton = useRef<HTMLButtonElement>(null);
  const selectorMenuWrapper = useRef<HTMLDivElement>(null);
  const selectorMenu = useRef<HTMLDivElement>(null);
  

  function handleClick() {
    if (selectorMenu == null) return;
    if (button == null) return;

    const visibility = button.current?.getAttribute("aria-expanded");
    const body = document.querySelector("body");


    if (visibility === "false") {
      selectorMenu.current?.setAttribute("aria-expanded", "true");
      button.current?.setAttribute("aria-expanded", "true");
      body?.classList.add("overflow-hidden");
      
      selectorMenuWrapper.current?.setAttribute("aria-expanded", "true");
    } else {
      selectorMenu.current?.setAttribute("aria-expanded", "false");
      button.current?.setAttribute("aria-expanded", "false");
      selectorMenuWrapper.current?.setAttribute("aria-expanded", "false");
      body?.classList.remove("overflow-hidden");
    }
  }
  return (
    <div className="mobile-selector-wrapper">
      <button
        type="button"
        className="selector-button text-style-heading-50 font-weight-10"
        aria-expanded="false"
        ref={button}
        onClick={handleClick}
      >
        {props.text}
        {props.svg_component}
      </button>
      <div className="selector-menu-wrapper" aria-expanded="false" ref={selectorMenuWrapper}>
        <div className="selector-menu" aria-expanded="false" ref={selectorMenu}>
          <button className="selector-menu-exit" ref={exitButton} onClick={handleClick}>
            <BlackExit width={sizes.defaultSize} />
          </button>
          <div className="selector-menu-contents">
            <SelectorEntry text="Pret Crescator" />
          </div>
          <button type="button" className="show-products" onClick={handleClick}>
            <span className="show-products-text text-style-heading-50">Afiseaza Produse</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface II_SelectorEntry {
  svg_component?: JSX.Element;
  text?: string;
}

function SelectorEntry(props: II_SelectorEntry) {
  return (
    <div className="selector-entry-wrapper">
      <label htmlFor="selectEntry" className="text-style-heading-50">
        Sorteaza dupa:{" "}
      </label>
      <div className="select-entry">
        <select
          id="selectEntry"
          name="selectEntry"
          className="text-style-heading-50 font-weight-20"
        >
          <option>Pret Crescator</option>
          <option>Pret Descrescator</option>
          <option>Relevanta</option>
        </select>
        <div className="arrow"></div>
      </div>
    </div>
  );
}

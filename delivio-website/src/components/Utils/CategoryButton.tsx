import { useState } from "react";
import { Link } from "react-router-dom";
import { BlueExit, EntryCategory } from "../SVGComponents/SVG";
import "./CategoryButton.scss";
import { sizes } from "./utils";
interface II_CategoryButton {
  text: string;
  className: string;
  svg_component: JSX.Element;
}

interface II_CategoryButtonEntry {
  category: string;
}
export function CategoryButton(props: II_CategoryButton) {
  const [ariaExpanded, setAriaExpanded] = useState(false);
  const body = document.querySelector("body");
  if (ariaExpanded) {
    body?.classList.add("overflow-hidden");
  }else {
    body?.classList.remove("overflow-hidden");
  }
  function CategoryButtonEntry(props: II_CategoryButtonEntry) {
    return (
      <Link to={`/Magazin/Categorii/${props.category}`} onClick={()=>setAriaExpanded(false)}>
        <div className="category-entry-wrapper">
          <span className="text-style-heading-60 clr-primary-300">{props.category}</span>
          <EntryCategory width={sizes.intermediateSize} />
        </div>
      </Link>
    );
  }

  return (
    <div className="category-wrapper">
      <button
        type="button"
        className={"category-button " + props.className}
        aria-controls="category-content"
        onClick={() => setAriaExpanded(!ariaExpanded)}
      >
        <span className="text-style-heading-50 font-weight-10">Categorii</span>
        {props.svg_component}
      </button>
      <div className="category-content" aria-expanded={ariaExpanded}>
        <button
          type="button"
          className="category-content-header"
          onClick={() => setAriaExpanded(!ariaExpanded)}
        >
          <span className="text-style-heading-40 clr-primary-400">Categorii</span>
          <BlueExit width={sizes.smallerSize} />
        </button>
        <div className="category-content-entries">
          {Array.from({length:20}).map(() => <CategoryButtonEntry category="Profile S" />)}
        </div>
        <button type="button" className="header-show-products" onClick={() => setAriaExpanded(!ariaExpanded)}>
          <span className=" header-show-products-text text-style-heading-50 clr-primary-100 ">Afiseaza Produse</span>
        </button>
        
      </div>
    </div>
  );
}


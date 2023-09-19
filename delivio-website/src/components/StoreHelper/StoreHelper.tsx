import { useRef, useState } from "react";
import { Form, useFetcher, useNavigation, useSubmit } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { ArrowDown, RedSearch, SearchButtonSVG } from "../SVGComponents/SVG";
import { CategoryButton } from "../Utils/CategoryButton";
import SelectorButton from "../Utils/SelectorButton";
import { sizes } from "../Utils/utils";
import "./StoreHelper.scss";
export function StoreHelper() {
  const [isVisible, setVisibility] = useState(true);
  const searchBar = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const label = useRef<HTMLLabelElement>(null);
  const svgWrapperButton = useRef<HTMLButtonElement>(null);
  const submit = useSubmit();
  const navigation = useNavigation();
  function handleClick() {
    if (isVisible) {
      input.current?.focus();
    }
    setVisibility(!isVisible);

    if (!isVisible) {
      if (input.current?.form == null) return;
      submit(input.current?.form);
      input.current?.blur();
    }
  }
  return (
    <div className="store-helper" aria-expanded={!isVisible}>
    <div className="store-helper-nav-mobile" aria-expanded={!isVisible} ref={nav}>
      {isVisible && (
        <CategoryButton
          text="Categorii"
          className="text-style-heading-60"
          svg_component=<ArrowDown width={sizes.smallerSize} />
        />
      )}

      {isVisible && (
        <SelectorButton
          text="Sorteaza"
          className="text-style-heading-60"
          svg_component=<ArrowDown width={sizes.smallerSize} />
        />
      )}
      <div className="search-bar-wrapper" aria-expanded={!isVisible} ref={searchBar}>
        <button className="svg-wrapper" onClick={handleClick} ref={svgWrapperButton}>
          <label
            htmlFor="mainSearch"
            data-visible={isVisible}
            ref={label}
            className="store-helper-label text-style-heading-50 font-weight-20"
          >
            Cauta
          </label>
          {navigation.state === "loading" ? <SearchLoader onClick={() => (console.log(2))}/> : <RedSearch/>}
        </button>

        <Form
          method="get"
          onSubmit={(event) => {
            input.current?.blur();
            if (svgWrapperButton == null) return;
            svgWrapperButton.current?.click();
            
          }}
        >
          <input
            type="text"
            name="mainSearch"
            id="mainSearch"
            placeholder="Cauta"
            ref={input}
            data-visible={!isVisible}
            className="searchInput"
          />
        </Form>
      </div>
    </div>
    </div>
  );
}

export function SearchLoader({onClick} : {onClick: React.MouseEventHandler}) {
  return <div className="loader" onClick={onClick}>
  </div>;
}

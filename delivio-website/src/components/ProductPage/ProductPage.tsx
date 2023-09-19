import "./ProductPage.scss";
import { StoreGrid, StoreGridFallback } from "../StoreGrid/StoreGrid";
import { ArrowDown, BoldBasket, OrangeArrow } from "../SVGComponents/SVG";
import { sizes } from "../Utils/utils";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { IIDataItem } from "../Utils/utils.d";
import { Form, LoaderFunctionArgs, useFetcher, useLoaderData, useSubmit } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import { smartDataSet, updateEntry } from "../../DataLoading/getData";
interface II_ProductPage {
  entry: IIDataItem;
  data: IIDataItem[];
}
export async function loader(params: LoaderFunctionArgs): Promise<II_ProductPage> {
  console.log(params.params.storeId);
  const category = await smartDataSet().then(data=> data.get(params.params.storeId || "")).then(data =>data?.category);
  console.log(category);
  const data = await fetch(`/product/?mainSearch=${category}`).then(data => data.json());
  const id = params.params.storeId;
  for (const entry of data) {
    if (entry.id === id) {
      return { entry, data };
    }
  }
  throw Error("CUR");
}
export default function ProductPage() {
  const { entry, data } = useLoaderData() as II_ProductPage;
  const quantityDiv = useRef<HTMLButtonElement>(null);
  const inputButton = useRef<HTMLInputElement>(null);
  const [currentValue, setValue] = useState("");
  const [currentValueInput, setValueInput] = useState("1 Bucata");
  const [previousValue, setPrevious] = useState("1");
  const formRef = useRef<HTMLFormElement>(null) ;
  const submit = useSubmit();
  function handleClick(event: React.FormEvent) {
    if (inputButton == null) return;
    if (quantityDiv == null) return;
    inputButton.current?.focus();
    setValueInput("");
  }

  function handleEnter(event: React.KeyboardEvent) {
    const num = /[0-9]/;
    if (event.key.match(num)) {
      if (Number(currentValue + event.key) > 1000) {
        inputButton.current?.blur();
        return;
      }
      setValue(currentValue + event.key);
    }

    if (event.key === "Backspace") {
      setValue(currentValue.slice(0, -1));
    }

    if (event.key === "Enter") {
      setValueInput(
        `${inputButton.current?.value} ${
          Number(inputButton.current?.value) > 1 ? "Bucati" : "Bucata"
        }`
      );
      setPrevious(currentValue === "" ? previousValue : currentValue);
      setValue("");
      inputButton.current?.blur();
      return;
    }
  }

  function handleBlur(event: React.FocusEvent) {
    if (currentValue === "") {
      setValueInput(`${previousValue} ${Number(previousValue) > 1 ? "Bucati" : "Bucata"}`);
      setValue("");
      return;
    }
    setValueInput(`${currentValue} ${Number(currentValue) > 1 ? "Bucati" : "Bucata"}`);
    setPrevious(currentValue);
    setValue("");
  }
  const fetcher = useFetcher();
  useEffect(() => {
    const body = document.querySelector("body");
    if(fetcher.state === "loading") {
      setValue("");
    }
  }, [fetcher.state])

  return (
    <div className="product-page">
      <ScrollRestoration />
      <div className="product-page-info">
        <span className="clr-primary-400 text-style-heading-50 font-weight-10">
          {entry.category}
        </span>
        <div className="rotate">
          <ArrowDown width={"var(--sz-40)"} />
        </div>{" "}
        <span className="clr-primary-500 text-style-heading-50 font-weight-40">{entry.id}</span>
      </div>
      <div className="product-info-rectangle" />
      <div className="product-page-grid">
        <img src={entry.image} alt={entry.image} />

        <div className="product-page-details">
          <span className="detail-title text-style-heading-60">Detalii</span>
          <div className="detail-wrapper text-style-heading-50 font-weight-00">
            <span>
              Inaltime {entry.height}
              <b>mm</b>{" "}
            </span>
            <span>
              Lungime {entry.length}
              <b>mm</b>{" "}
            </span>
            <span>
              Sectiune {entry.section}
              <b>mm</b>{" "}
            </span>
          </div>

          <div className="product-details-rectangle" />

          <fetcher.Form className="product-page-buy-details" action="/Magazin/Cos" method="post" ref={formRef}>
            <div className="product-page-price text-style-heading-60">{entry.price || 100} Ron</div>
            <button
              type="button"
              className="product-buy-quantity"
              ref={quantityDiv}
              onClick={handleClick}
            >
              <input
                type="text"
                name={entry.id}
                placeholder={currentValueInput}
                className="input-quantity"
                ref={inputButton}
                value={currentValue}
                onKeyDown={handleEnter}
                onBlur={handleBlur}
                inputMode="numeric"
              />
              <div className="quantity-arrow">
                <OrangeArrow width={sizes.intermediateSize} />
              </div>
            </button>
            <button type="submit" className="product-page-basket text-style-heading-60" onClick={() => {
              setValue(previousValue);
              }}
              
            >
              Adauga in cos
              <BoldBasket width={sizes.largerSize} />
            </button>
          </fetcher.Form>
        </div>
      </div>

      <div className="product-page-similar">
        <div className="product-page-similar-details">
          <span className="text-style-heading-50 clr-primary-400 font-weight-10">
            Produse Similare
          </span>

          <div className="rotate">
            <ArrowDown width={"var(--sz-40)"} />
          </div>

          <span className="text-style-heading-50 clr-primary-500 font-weight-40">
            {entry.category}
          </span>
        </div>
        <div className="product-info-rectangle" />
        <StoreGrid itemArray={data} defaultBehaviour={false} />
      </div>
    </div>
  );
}

export function SmartInput({id, quantity} : {id: string, quantity : number}) {
  const quantityDiv = useRef<HTMLButtonElement>(null);
  const inputButton = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [currentValue, setValue] = useState(``);
  const [currentValueInput, setValueInput] = useState(`${quantity}`);
  const [previousValue, setPrevious] = useState("1");
  const submit = useSubmit();
  function handleClick(event: React.FormEvent) {
    if (inputButton == null) return;
    if (quantityDiv == null) return;
    inputButton.current?.focus();
    setValueInput("");
  }

  function handleEnter(event: React.KeyboardEvent) {
    const num = /[0-9]/;
    if (event.key.match(num)) {
      if (Number(currentValue + event.key) > 1000) {
        inputButton.current?.blur();
        return;
      }
      setValue(currentValue + event.key);
    }

    if (event.key === "Backspace") {
      setValue(currentValue.slice(0, -1));
    }

    if (event.key === "Enter") {
      setValueInput(
        `${inputButton.current?.value} ${
          Number(inputButton.current?.value) > 1 ? "" : ""
        }`
      );
      submit(formRef.current);
      setPrevious(currentValue === "" ? previousValue : currentValue);
      
      
  
      setValue("");
      inputButton.current?.blur();
      return;
    }
  }

  function handleBlur(event: React.FocusEvent) {
    if (currentValue === "") {
      setValueInput(`${previousValue}`);
      setValue("");
      return;
    }
    setValueInput(`${currentValue}`);
    setPrevious(currentValue);
    submit(formRef.current);
    setValue("");
  }
  const fetcher  = useFetcher();
  return (

    <Form className="product-page-buy-details" method="post" action={`add/${id}`} ref={formRef}>
      <button
        type="button"
        className="product-buy-quantity"
        ref={quantityDiv}
        onClick={handleClick}
      >
        <input
          type="text"
          name={id}
          placeholder={currentValueInput}
          className="input-quantity"
          ref={inputButton}
          value={currentValue}
          onKeyDown={handleEnter}
          onBlur={handleBlur}
          inputMode="numeric"
        />
        <div className="quantity-arrow">
          <OrangeArrow width={sizes.intermediateSize} />
        </div>
      </button>
    </Form>
  );
}

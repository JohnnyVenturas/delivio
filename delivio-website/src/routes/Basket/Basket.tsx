import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  addBucket,
  getBasket,
  getQuantity,
  smartDataSet,
  updateEntry,
} from "../../DataLoading/getData";
import "./Basket.scss";
import { IIDataItem } from "../../components/Utils/utils.d";
import { BlueExit } from "../../components/SVGComponents/SVG";
import { sizes } from "../../components/Utils/utils";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SmartInput } from "../../components/ProductPage/ProductPage";
import localforage from "localforage";
import { removeItem } from "../../DataLoading/getData";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { convertToObject } from "typescript";

export interface II_Basket_Entry {
  quantity: number;
  itemData?: IIDataItem;
}

export type II_Basket_Data = Map<string, II_Basket_Entry>;

export async function loader() {
  const data = await getBasket();
  console.log(data);
  if (data == null || data?.size === 0) return redirect("/Magazin/Cos/Gol");
  return data;
}

export async function action(params: ActionFunctionArgs) {
  await getBasket(); //Make sure the basket is set;
  try {
    const request = await params.request.formData();
    console.log(request);
    for (const [key, newEntry] of request) {
      console.log(key);
      const entry = (await smartDataSet()).get(key);
      console.log(entry, "muie");
      await addBucket({ quantity: Number(newEntry), itemData: entry });
    }
  } catch (err) {
    console.log(err);
  }
  return redirect("/Magazin/Cos");
}
export default function BasketPage() {
  const data = useLoaderData() as II_Basket_Data;

  const location = useLocation();
  const array: [number, IIDataItem][] = useMemo(() => {
    const muie: [number, IIDataItem][] = [];
    console.log(data);
    for (const key of data.keys()) {
      const entry = data.get(key);
      if (entry == null) throw new Error("muie");
      if (entry.itemData == null) throw Error("we have some null");
      muie.push([entry.quantity, entry.itemData]);
    }
    return muie;
  }, [data]);
  const [arrayState, setState] = useState(array);
  const nodeRef = useRef(null);

  useEffect(() => {
    setState(array);
  }, [array]);

  return (
    <>
      <div className="basket-page">
        <Title />
        <Heading />
        <div className="basket-page-wrapper">
          {arrayState.map((entry) => {
            return <ItemEntry itemData={entry[1]} quantity={entry[0]} />;
          })}
        </div>
        <Total />
      </div>
    </>
  );
}

function ItemEntry({
  itemData,
  quantity,
}: {
  itemData: IIDataItem;
  quantity: number;
}) {
  const navigation = useNavigate();
  const [quantityState, setQuantity] = useState(quantity);
  const [totalQuantityState, setTotal] = useState(quantity * itemData.price);
  const upperString = (myString: string) => {
    return myString[0].toUpperCase() + myString.toLowerCase().slice(1);
  };

  useEffect(() => {
    (async () => {
      const data = (await getQuantity(itemData.id)) || -1;
      setQuantity(data);
    })();
  }, [itemData.id]);
  useEffect(() => {
    setTotal(quantityState * itemData.price);
  }, [quantityState, itemData.price]);
  return (
    <>
      <div className="basket-item-entry">
        <img src={itemData.image} alt="Imagine" />
        <div className="basket-item-description  text-style-heading-50 font-weight-40">
          <span
            onClick={() => {
              navigation({
                pathname: "/Magazin",
                search: `/Magazin/?mainSearch=${encodeURIComponent(
                  itemData.category || ""
                )}`,
              });
            }}
            className="text-style-heading-55 clr-grey-900"
          >
            {upperString(itemData.name || "")}
          </span>
          <span
            onClick={() => {
              navigation({
                pathname: `/Magazin/${encodeURIComponent(itemData.id || "")}`,
              });
            }}
            className="clr-grey-500 text-style-heading-40 font-weight-40"
          >
            {upperString(itemData.category || "")} <br/>
            <br />
            Prod. {itemData.id}
          </span>
        </div>
        <div className="basket-item-entry-description">
          <span className="text-style-heading-55">
            {itemData.price * quantityState} Ron
          </span>
          <div className="quantity-wrapper">
            <input
              name="basket-quantity"
              type="text"
              required
              pattern="\d+"
              onBlur={async (event) => {
                const parent = event.currentTarget.parentNode as HTMLDivElement;
                if (parent == null) return null;
                if (event.currentTarget.validity.valid === false) {
                  parent.classList.add("invalid");
                }
                if (event.currentTarget.validity.valid === true) {
                  parent.classList.remove("invalid");
                }
                await updateEntry(itemData.id, { quantity: quantityState });
              }}
              defaultValue={quantityState}
              onChange={(event) => {
                const parent = event.currentTarget.parentNode as HTMLDivElement;
                if (parent == null) return null;
                if (event.currentTarget.validity.valid === false) {
                  parent.classList.add("invalid");
                }
                if (event.currentTarget.validity.valid === true) {
                  parent.classList.remove("invalid");
                }
                if (event.currentTarget.validity.valid === true) {
                  setQuantity(Math.min(Number(event.currentTarget.value), 999));
                }
                if (quantityState === 999) {
                  event.currentTarget.value = "999";
                }
              }}
            ></input>

            <div className="error text-style-heading-50">
              Te rog sa introduci o cantitate pozitiva
            </div>
          </div>
          <span className="text-style-heading-55">{itemData.price} Ron</span>
        </div>

        <div className="basket-mobile-entry-descriptions">
          <span className="text-style-heading-50 font-weight-20 clr-grey-500">
            Pret:
          </span>
          <span className="text-style-heading-50 font-weight-20 clr-grey-500">
            Cantitate:
          </span>
          <span className="text-style-heading-50 font-weight-20 clr-grey-500">
            Subtotal:
          </span>
        </div>
      </div>
    </>
  );
}

function Title() {
  return (
    <div className="basket-page-title">
      <span className="text-style-heading-60 font-weight-20">
        Cosul tau de cumparaturi
      </span>
      <Payment />
    </div>
  );
}

function Payment() {
  return (
    <Link
      to="/Magazin/Checkout"
      className="basket-payment font-weight-30 text-style-heading-40"
    >
      FINALIZEAZA PLATA
    </Link>
  );
}

function Heading() {
  return (
    <div className="basket-heading">
      <span className="text-style-heading-50  font-weight-00 clr-primary-700">
        Produsele Tale
      </span>
      <div className="basket-heading-details">
        <span className="text-style-heading-50 font-weight-30">Pret</span>
        <span className="text-style-heading-50 font-weight-30">Cantitate</span>
        <span className="text-style-heading-50 font-weight-30">Total</span>
      </div>
    </div>
  );
}

function Close({ id }: { id: string }) {
  const fetcher = useFetcher();
  return (
    <Form method="post" action={`Sterge/${encodeURIComponent(id)}`}>
      <button
        className="basket-exit clr-grey-800 font-weight-400"
        onClick={async () => await removeItem(id)}
        type="submit"
      >
        <span className="font-weight-30">Elimina</span>
        <BlueExit width={sizes.smallerSize} />
      </button>
    </Form>
  );
}

function Total() {
  const fetcher = useFetcher();
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<Map<string, II_Basket_Entry>>(new Map());
  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/Magazin/Cos");
      return;
    }
    if (fetcher.data && fetcher.state === "submitting") {
      fetcher.load("/Magazin/Cos");
      return;
    }
  }, [fetcher, fetcher.data, data]);
  useEffect(() => {
    if (fetcher.data) {
      setTotal(0);
      const data = fetcher.data as Map<string, II_Basket_Entry>;
      for (const [key, entry] of data) {
        let price = entry.itemData?.price as number;
        if (price == null) {
          price = 100;
        }
        setTotal((total) => entry.quantity * price + total);
      }
      return;
    }
  }, [fetcher.data]);
  return (
    <>
      <div className="basket-total">
        <div className="basket-subtotal">
          <span className="font-weight-25 text-style-heading-40">
            Subtotal:
          </span>
          <span className="text-style-heading-40 font-weight-40">{total}</span>
        </div>
        <div className="basket-transport ">
          <span className="font-weight-25 text-style-heading-40">
            Transport:
          </span>
          <span className="text-style-heading-40 font-weight-40">0</span>
        </div>
        <div className="basket-total-value">
          <span className="font-weight-40 text-style-heading-60">Total:</span>
          <span className="text-style-heading-55  font-weight-30">{total}</span>
        </div>
      </div>
    </>
  );
}

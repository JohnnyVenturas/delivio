import localforage from "localforage";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { BlackArrowDown } from "../../components/SVGComponents/SVG";
import { sizes } from "../../components/Utils/utils";
import BasketPage from "../Basket/Basket";
import "./Checkout.scss";

export default function Checkout() {
  const paymentForm = useRef<HTMLFormElement>(null);
  const billingForm = useRef<HTMLFormElement>(null);
  async function handleClick(event: React.MouseEvent) {
    if (paymentForm.current == null) return;
    if (billingForm.current == null) return;

    const paymentData = new FormData(paymentForm.current);
    const billingData = new FormData(billingForm.current);
    const combinedData = new FormData();
    for (const [name, value] of paymentData) {
      combinedData.append(name, value);
    }
    for (const [name, value] of billingData) {
      combinedData.append(
        `billing${name[0].toUpperCase() + name.slice(1)}`,
        value
      );
    }
    await localforage.setItem("deliveryDetails", combinedData);
    await fetch("/orders", {
      method: "POST",
      body: combinedData,
    });
  }
  return (
    <>
      <div className="checkout-page">
        <PaymentForm paymentForm={paymentForm} />
        <BillingForm billingForm={billingForm} />
      </div>

      <div className="checkout-outlet">
        <Outlet />
      </div>
    </>
  );
}

function BillingForm({
  billingForm,
}: {
  billingForm: React.Ref<HTMLFormElement>;
}) {
  const [billingAdress, setBillingAdress] = useState(false); //here we assume the billing address is the same as the delivery address
  const location = useLocation();
  return (
    <form className="billing-form" ref={billingForm}>
      <div className="billing-form-heading">
        <Heading
          headingText="Adresa facturare"
          subHeadingText="Te rog sa selectezi adresa de facturare"
        />
      </div>
      <div className="billing-options">
        <button
          type="button"
          aria-expanded={!billingAdress}
          onClick={() => setBillingAdress(false)}
        >
          <span className="text-style-heading-50">Aceeasi adresa</span>
        </button>
        <button
          type="button"
          aria-expanded={billingAdress}
          onClick={() => setBillingAdress(true)}
        >
          <span className="text-style-heading-50">Alta adresa</span>
        </button>
      </div>

      {!billingAdress && !(location.pathname === "/Magazin/Checkout/Cos") && (
        <Link
          to="/Magazin/Checkout/Cos"
          className="continue text-style-heading-55"
        >
          Continua cu plata
        </Link>
      )}
      {billingAdress ? <BillingPaymentForm /> : <></>}
      <input
        className="hidden"
        value={`${billingAdress}`}
        name="differentBillingAddress"
      />
    </form>
  );
}
function BillingPaymentForm() {
  const [bussinessState, setBussiness] = useState(false);
  const [billingAdress, setBillingAdress] = useState(true); //here we assume the billing address is the same as the delivery address
  return (
    <div className="billing-details">
      <div className="billing-social-details">
        <Heading
          headingText="Informatii client"
          subHeadingText="Te rog sa completezi urmatoarele intrari"
        />
        <div className="billing-details-options">
          <button
            type="button"
            aria-expanded={!bussinessState}
            onClick={() => setBussiness(false)}
          >
            <span className="text-style-heading-40">Personana Fizica</span>
          </button>
          <button
            type="button"
            aria-expanded={bussinessState}
            onClick={() => setBussiness(true)}
          >
            <span className="text-style-heading-40">Personana Juridica</span>
          </button>
        </div>
        {bussinessState === true ? (
          <>
            <Selector
              salutationText="Tipul Companiei"
              options={["Societate Comerciala", "Alta"]}
              name="companyType"
            />
            <InputType
              placeholder="Nume companie *"
              type="text"
              name="companyName"
              required={true}
            />
            <InputType
              placeholder="CUI *"
              type="text"
              name="vatIdentificationNumber"
              required={true}
            />
            <InputType
              placeholder="Nr registrul comertului"
              type="text"
              name="vatRegistrationNumber"
              required={false}
            />
          </>
        ) : (
          <>
            <Selector
              salutationText="Adresare *"
              options={["Domnul", "Doamna"]}
              name="clientSalutation"
            />
            <InputType
              placeholder="Nume *"
              type="text"
              name="clientLastName"
              required={true}
            />
            <InputType
              placeholder="Prenume *"
              type="text"
              name="clientFirstName"
              required={true}
            />
          </>
        )}
        <InputType
          placeholder="Email *"
          type="email"
          name="email"
          required={true}
        />
      </div>
      <div className="billing-details-address">
        <Heading
          headingText="Adresa livrare"
          subHeadingText="Te rog sa alegi adresa de facturare"
        />
        <Selector
          salutationText="Tara *"
          options={["Romania", "Italia"]}
          name="country"
        />
        <Selector
          salutationText="Judet *"
          options={["Bihor", "Arad"]}
          name="county"
        />
        <InputType
          placeholder="Adresa *"
          type="text"
          name="address"
          required={true}
        />
        <InputType
          placeholder="Cod Postal"
          type="text"
          name="postalCode"
          required={true}
          pattern="\d{1,}"
        />
        <InputType
          placeholder="Telefon *"
          type="text"
          name="phoneNumber"
          required={true}
        />
        <input
          className="hidden"
          value={`${bussinessState}`}
          name="isBusiness"
        />
      </div>
    </div>
  );
}
function PaymentForm({
  paymentForm,
}: {
  paymentForm: React.Ref<HTMLFormElement>;
}) {
  const [bussinessState, setBussiness] = useState(false);
  const [billingAdress, setBillingAdress] = useState(true); //here we assume the billing address is the same as the delivery address
  return (
    <form
      name="client-details"
      className="client-details"
      onSubmit={(event) => {
        event.preventDefault();
        const body = new FormData(event.currentTarget);
        console.log("muie");
        console.log(body);
      }}
      ref={paymentForm}
    >
      <div className="checkout-details">
        <div className="checkout-social-details">
          <Heading
            headingText="Informatii client"
            subHeadingText="Te rog sa completezi urmatoarele intrari"
          />
          <div className="checkout-details-options clr-primary-800">
            <button
              type="button"
              aria-expanded={!bussinessState}
              onClick={() => setBussiness(false)}
            >
              <span className="text-style-heading-50">Personana Fizica</span>
            </button>
            <button
              type="button"
              aria-expanded={bussinessState}
              onClick={() => setBussiness(true)}
            >
              <span className="text-style-heading-50">Personana Juridica</span>
            </button>
          </div>
          {bussinessState === true ? (
            <>
              <Selector
                salutationText="Tipul Companiei"
                options={["Societate Comerciala", "Alta"]}
                name="companyType"
              />
              <InputType
                placeholder="Nume companie *"
                type="text"
                name="companyName"
                required={true}
              />
              <InputType
                placeholder="CUI *"
                type="text"
                name="vatIdentificationNumber"
                required={true}
              />
              <InputType
                placeholder="Nr registrul comertului"
                type="text"
                name="vatRegistrationNumber"
                required={false}
              />
            </>
          ) : (
            <>
              <Selector
                salutationText="Adresare *"
                options={["Domnul", "Doamna"]}
                name="clientSalutation"
              />
              <InputType
                placeholder="Nume *"
                type="text"
                name="clientLastName"
                required={true}
              />
              <InputType
                placeholder="Prenume *"
                type="text"
                name="clientFirstName"
                required={true}
              />
            </>
          )}
          <InputType
            placeholder="Email *"
            type="email"
            name="email"
            required={true}
          />
        </div>
        <div className="checkout-details-address">
          <Heading
            headingText="Adresa livrare"
            subHeadingText="Te rog sa alegi metoda de livrare"
          />
          <SpecialSelector
            salutationText="Livare Rapida"
            options={["Livrare Rapida", "Livrare Standard"]}
          />
          <Selector
            salutationText="Tara *"
            options={["Romania", "Italia"]}
            name="country"
          />
          <Selector
            salutationText="Judet *"
            options={["Bihor", "Arad"]}
            name="county"
          />
          <InputType
            placeholder="Adresa *"
            type="text"
            name="address"
            required={true}
          />
          <InputType
            placeholder="Cod Postal *"
            type="text"
            name="postalCode"
            required={true}
            pattern="\d{1,}"
          />
          <InputType
            placeholder="Telefon *"
            type="text"
            name="phoneNumber"
            required={true}
          />
        </div>
        <input
          className="hidden"
          value={`${bussinessState}`}
          name="isBusiness"
        />
      </div>
    </form>
  );
}

function Heading({
  headingText,
  subHeadingText,
}: {
  headingText: string;
  subHeadingText: string;
}) {
  return (
    <div className="checkout-heading">
      <h1 className="text-style-heading-60 clr-primary-900">{headingText}</h1>
      <span className="text-style-heading-50 clr-grey-500">
        {subHeadingText}
      </span>
    </div>
  );
}

function Selector({
  salutationText,
  options,
  name,
}: {
  salutationText: string;
  options: string[];
  name: string;
}) {
  const [salutation, setSalutation] = useState(salutationText);
  const [inputValue, setValue] = useState(salutationText);
  const [salutationVisible, setVisibleSalutation] = useState(false);
  useEffect(() => {
    setValue(salutation);
  }, [salutation]);

  return (
    <div
      className="salutation text-style-heading-40"
      onClick={() => setVisibleSalutation((val) => !val)}
    >
      <span>{salutation}</span>
      <div className="checkout-rotate" aria-expanded={salutationVisible}>
        <BlackArrowDown width={sizes.smallerSize} />
      </div>
      <div className="salutation-options" aria-expanded={salutationVisible}>
        {options.map((entry) => (
          <span
            onClick={(event) => {
              setSalutation(entry);
              setVisibleSalutation(false);
              event.stopPropagation();
            }}
          >
            {entry}
          </span>
        ))}
      </div>
      <input type="text" name={name} value={inputValue} className="hidden" />
    </div>
  );
}

function InputType({
  placeholder,
  type,
  name,
  required,
  pattern,
}: {
  placeholder: string;
  type: string;
  name: string;
  required: boolean;
  pattern?: string;
}) {
  const [placeholderState, setPlaceholder] = useState(placeholder);
  const [value, setValue] = useState("");
  useEffect(() => {
    setPlaceholder(placeholder);
  }, [placeholder]);
  const inputWrapper = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  return (
    <div
      className="checkout-input text-style-heading-40"
      onClick={() => setPlaceholder("")}
      ref={inputWrapper}
    >
      <input
        placeholder={placeholderState}
        id={name}
        name={name}
        type={type}
        key={name}
        required={required}
        pattern={pattern}
        onBlur={(event) => {
          if (event.currentTarget.validity.valid === false) {
            inputWrapper.current?.classList.add("invalid-input");
          }
          if (event.currentTarget.validity.valid === true) {
            inputWrapper.current?.classList.remove("invalid-input");
          }
        }}
        onChange={(event) => {
          if (event.currentTarget.validity.valid === true) {
            inputWrapper.current?.classList.remove("invalid-input");
          }
        }}
      />
      <span>{placeholder}</span>
      <div className="error" onClick={() => input.current?.focus()}>
        {type === "email"
          ? "Adresa de email invalida"
          : name === "postalCode"
          ? "Te rog sa alegi un cod postal format din cifre"
          : "Camp necesar"}
      </div>
    </div>
  );
}

function SpecialSelector({
  salutationText,
  options,
}: {
  salutationText: string;
  options: string[];
}) {
  const [salutation, setSalutation] = useState(salutationText);
  const [price, setPrice] = useState("20");
  const [salutationVisible, setVisibleSalutation] = useState(false);
  //In the future we will need to link this to the backend
  return (
    <div
      className="special-salutation text-style-heading-50"
      onClick={() => setVisibleSalutation((val) => !val)}
    >
      <span>{salutation}</span>
      <span>{price}Ron</span>
      <div className="checkout-rotate" aria-expanded={salutationVisible}>
        <BlackArrowDown width={sizes.smallerSize} />
      </div>
      <div
        className="special-salutation-options"
        aria-expanded={salutationVisible}
      >
        {options.map((entry) => (
          <span
            onClick={(event) => {
              setSalutation(entry);
              setVisibleSalutation(false);
              event.stopPropagation();
            }}
          >
            {entry}
          </span>
        ))}
      </div>
      <input className="hidden" value={salutation} name="deliveryType" />
      <input className="hidden" value={price} name="deliveryPrice" />
    </div>
  );
}

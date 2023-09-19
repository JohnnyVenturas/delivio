import { Link } from "react-router-dom";
import "./StoreItem.scss";
interface II_StoreItem {
  price?: number;
  svg_component?: JSX.Element;
  id?: string;
  length?: string;
  height?: string;
  section?: string;
  image?: string;
  name?: string;
  category?: string;
}
export default function StoreItem(props: II_StoreItem) {
  const id = encodeURIComponent(props.id || "");
  return (
    <Link to={`/Magazin/${id}`} className="store-item">
      <img className="store-item-image" src={`${props.image}`} alt="Imagine" />

      <div className="details text-style-heading-35 clr-primary-200">
        <span> {props.name}</span>
        <span> {props?.length} L(mm)</span>
        <span> {props?.height} H(mm)</span>
      </div>

      <Link to={`/${props.id}`} className="price">
        <span className="text-style-heading-35">{`${String(props.price)}`} Ron</span>
        {props.svg_component}
      </Link>
    </Link>
  );
}

export function StoreItemFallback() {
  return (
    <div className="fallback-store-item">
      <div className="fallback-store-item-image" />

      <div className="fallback-store-item-details">
        <span />
        <span />
        <span />
      </div>

      <div className="fallback-price">
        <span className="text-style-heading-35" />
      </div>
    </div>
  );
}

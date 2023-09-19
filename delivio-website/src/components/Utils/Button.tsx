import { Link, NavLink } from "react-router-dom";
import "./Button.scss";
import "./utils.scss";
interface II_Button {
  link: string;
  link_name?: string;
  svg_component?: JSX.Element;
  className?: string;
  classNameHref?: string;
  onClick?:React.MouseEventHandler;
}

export default function Button(props: II_Button) {
  const classList = `${props.className} utils-default-button default-button`;
  return (
    <button type="button" className={classList}>
      <NavLink
        end to={props.link}
        onClick={props.onClick}
        className={({ isActive, isPending }) =>
        (isActive ? "active-button" : isPending ? "pending-button" : "default-button"
         + props.className )}
      >
        {props.link_name}
      </NavLink>
      {props.svg_component}
    </button>
  );
}

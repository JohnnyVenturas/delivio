import "./SearchBar.scss"
interface II_SearchBar {
  svg_component:JSX.Element;
}
export function SearchBar(props: II_SearchBar) {
  return (
    <div className="search-bar-wrapper">  

    <input type="text" placeholder="Cauta" className="border-radius-10 text-style-heading-50"/>
    <div className="svg-wrapper">
    {props.svg_component}
    </div>
    </div>
  )
}


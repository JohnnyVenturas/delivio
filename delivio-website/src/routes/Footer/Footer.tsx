import { Link } from "react-router-dom";
import { StoreHelper } from "../../components/StoreHelper/StoreHelper";
import "./Footer.scss";
export default function Footer() {
  return (
    <div className="footer">
      <ul>
        <h1 className="text-style-heading-50">Contact</h1>
        <li className="text-style-heading-50">
          <span>0747 286 395</span>
          <span>0747 286 424</span>
          <span>office@delivio.ro</span>
          <span>office@deliviofierforjat.ro</span>
        </li>
      </ul>
      <ul>
        <h1 className="text-style-heading-50">Inapoi in Magazin</h1>
        <li className="text-style-heading-50">
          <Link to={`/Magazin`}>Magazin</Link>
          <Link to={`/Despre Noi`}>Despre Noi</Link>
          <Link to={`/Despre Noi`}>Connecteaza-te</Link>
        </li>
      </ul>
      <ul>
        <h1 className="text-style-heading-50">Ajutor</h1>
        <li className="text-style-heading-50">
          <span>Termeni si Conditii</span>
          <span>Politica de date personale</span>
        </li>
      </ul>
    </div>
  );
}

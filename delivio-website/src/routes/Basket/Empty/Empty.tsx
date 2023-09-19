import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "./Empty.scss";
export async function loader() {
  const data = await fetch("/basket/randomArticles");
  return data;
}

interface II_Empty_Data {
  image: string;
  category: string;
}

export default function Empty({
  headingText = "Cosul tau de cumparaturi este gol",
  subHeadingText = "Nu ai adaugat nimic in cosul tau de cumparaturi. Verifica catalogul nostru pentru inspiratie",
}: {
  headingText?: string;
  subHeadingText?: string;
}) {
  const data = useLoaderData() as II_Empty_Data[];
  const navigation = useNavigate();
  return (
    <div className="empty-basket">
      <span className="text-style-heading-65 clr-primary-900 font-weight-20">
        {headingText}
      </span>
      <span className="text-style-heading-40 clr-grey-600">{subHeadingText}</span>
      <div className="empty-basket-grid">
        {data.map((entry) => {
          let tmp = entry.category.trim().toLowerCase().split(" ");
          tmp = tmp.map((entry) => entry[0].toUpperCase() + entry.slice(1));
          const category = tmp.join(" ");

          return (
            <div
              className="entry"
              onClick={() => {
                navigation({
                  pathname: `/Magazin`,
                  search:`mainSearch=${encodeURIComponent(entry.category)}`
                });
              }}
            >
              <img src={entry.image} alt="Imagine" />
              <span className="text-style-heading-40 font-weight-20 clr-primary-900">
                {category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

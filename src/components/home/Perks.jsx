import Reveal from "../common/Reveal";
import { FREE_SHIPPING_THRESHOLD, RETURN_DAYS } from "../../data/store";
import "../../styles/components/Perks.scss";

const perks = [
  {
    id: 1,
    title: "Free Shipping",
    text: `On orders over $${FREE_SHIPPING_THRESHOLD}`,
    icon: (
      <>
        <path d="M2 7h11v9H2z" />
        <path d="M13 10h4l4 3v3h-8z" />
        <circle cx="6" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </>
    ),
  },
  {
    id: 2,
    title: "Easy Returns",
    text: `${RETURN_DAYS}-day hassle-free returns`,
    icon: (
      <>
        <path d="M4 12a8 8 0 1 0 3-6.2" />
        <path d="M4 4v4h4" />
      </>
    ),
  },
  {
    id: 3,
    title: "Secure Checkout",
    text: "Protected, encrypted payments",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
        <path d="M9.5 12l1.8 1.8 3.2-3.6" />
      </>
    ),
  },
  {
    id: 4,
    title: "Weekly Drops",
    text: "Fresh styles every week",
    icon: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
      </>
    ),
  },
];

const Perks = function () {
  return (
    <section className="perks">
      <ul className="perks__list">
        {perks.map(function (perk, index) {
          return (
            <li key={perk.id}>
              <Reveal delay={index * 80} className="perks__item">
                <svg viewBox="0 0 24 24" className="perks__icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {perk.icon}
                </svg>
                <div>
                  <h3 className="perks__title">{perk.title}</h3>
                  <p className="perks__text">{perk.text}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Perks;

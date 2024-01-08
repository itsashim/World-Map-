import PropTypes from "prop-types";
import styles from "./CountryItem.module.css";

function CountryItem({ city }) {
  const { country, emoji } = city;

  // const formatDate = (date) =>
  //   new Intl.DateTimeFormat("en", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //     weekday: "long",
  //   }).format(new Date(date));

  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{country}</h3>
      {/* <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button> */}
    </li>
  );
}

CountryItem.propTypes = {
  city: PropTypes.any,
};

export default CountryItem;

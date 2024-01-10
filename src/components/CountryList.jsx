import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import { useCities } from "../context/useCities";
function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message={"Add some Cities"} />;

  const country = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, city];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {country.map((city) => (
        <CountryItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  isLoading: PropTypes.any,
  cities: PropTypes.any,
};

export default CountryList;

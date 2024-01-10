import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import styles from "./CityList.module.css";
import { useCities } from "../context/useCities";
function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={"Add some Cities"} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  isLoading: PropTypes.any,
  cities: PropTypes.any,
};

export default CityList;

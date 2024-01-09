import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      Position Latitude:
      <h3>
        {lat}
        {lng}
      </h3>
      <button onClick={() => setSearchParams({ lat: 98347598, lng: 9837459 })}>
        what is
      </button>
    </div>
  );
}

export default Map;

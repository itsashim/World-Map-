import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useCities } from "../context/useCities";
import { useGeolocation } from "../Hooks/useGeolocation";
import PropTypes from "prop-types";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Map() {
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: getGeolocationPosition,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([41, 0]);

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (getGeolocationPosition)
        setMapPosition([
          getGeolocationPosition.lat,
          getGeolocationPosition.lng,
        ]);
    },
    [getGeolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type={"position"} onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        ;
        {/* <Marker position={mapPosition}>
          <Popup>asdfsd</Popup>
        </Marker> */}
        ;
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

ChangeCenter.propTypes = {
  position: PropTypes.any,
};

export default Map;

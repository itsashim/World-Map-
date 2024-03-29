// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import { useCities } from "../context/useCities";

import styles from "./Form.module.css";
import Button from "./Button";
import DatePicker from "react-datepicker";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingPos, setIsLoadingPos] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingerr, setGeoCodingerr] = useState();

  const { pushCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();

  // console.log(lat);

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchUrl() {
        try {
          setIsLoadingPos(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error("Please select the City Location");

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          console.log(data);
        } catch (err) {
          setGeoCodingerr(err.message);
        } finally {
          setIsLoadingPos(false);
        }
      }

      fetchUrl();
    },
    [lat, lng]
  );

  async function onsubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await pushCity(newCity);
    navigate("/app/city");
  }

  if (isLoadingPos) return <Spinner />;

  if (!lat && !lng) return <Message message="Click the map to add a city" />;

  if (geoCodingerr) return <Message message={geoCodingerr} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.isLoading : ""}`}
      onSubmit={onsubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type={"back"}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;

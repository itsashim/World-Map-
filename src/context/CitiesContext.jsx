import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CitiesProvider = createContext();

function CitiesContext({ children }) {
  const [cities, setCitites] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(function () {
    const fetchCities = async function () {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:7000/cities`);
        const data = await res.json();
        setCitites(data);
      } catch {
        alert("There was a error loading the date");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <CitiesProvider.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesProvider.Provider>
  );
}

CitiesContext.propTypes = {
  children: PropTypes.any,
};

export { CitiesContext, CitiesProvider };

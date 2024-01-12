import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CitiesProvider = createContext();

function CitiesContext({ children }) {
  const [cities, setCitites] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:7000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was a error loading the date");
    } finally {
      setIsLoading(false);
    }
  }

  async function pushCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:7000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCitites(() => [...cities, data]);
    } catch {
      alert("Error on adding new city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:7000/cities/${id}`, {
        method: "DELETE",
      });

      setCitites(() => cities.filter((city) => city.id !== id));
    } catch {
      alert("Error on Deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesProvider.Provider
      value={{ cities, isLoading, currentCity, getCity, pushCity, deleteCity }}
    >
      {children}
    </CitiesProvider.Provider>
  );
}

CitiesContext.propTypes = {
  children: PropTypes.any,
};

export { CitiesContext, CitiesProvider };

import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const CitiesProvider = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "true/loading":
      return {
        ...state,
        isLoading: true,
      };
    case "false/loading":
      return {
        ...state,
        isLoading: false,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "city/create":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    default:
      throw new Error("unknown type");
  }
}

function CitiesContext({ children }) {
  // const [cities, setCitites] = useState([]);
  // const [isLoading, setIsLoading] = useState();
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    const fetchCities = async function () {
      try {
        dispatch({ type: "true/loading" });
        const res = await fetch(`http://localhost:7000/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        alert("There was a error loading the date");
      } finally {
        dispatch({ type: "false/loading" });
      }
    };
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (currentCity.id === Number(id)) return;
      try {
        dispatch({ type: "true/loading" });
        const res = await fetch(`http://localhost:7000/cities/${id}`);
        const data = await res.json();
        // setCurrentCity(data);
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        alert("There was a error loading the date");
      } finally {
        dispatch({ type: "false/loading" });
      }
    },
    [currentCity.id]
  );

  async function pushCity(newCity) {
    try {
      dispatch({ type: "true/loading" });
      const res = await fetch(`http://localhost:7000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/create", payload: data });
      // setCitites(() => [...cities, data]);
    } catch {
      alert("Error on adding new city");
    } finally {
      dispatch({ type: "false/loading" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "true/loading" });
      await fetch(`http://localhost:7000/cities/${id}`, {
        method: "DELETE",
      });

      // setCitites(() => cities.filter((city) => city.id !== id));
      dispatch({
        type: "city/delete",
        payload: id,
      });
    } catch {
      alert("Error on Deleting city");
    } finally {
      dispatch({ type: "false/loading" });
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

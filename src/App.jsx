import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";

function App() {
  // const BASE_URL = "http://localhost:7000";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product></Product>} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="city"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="city/:id" element={<City />} />
          <Route
            path="country"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

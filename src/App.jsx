import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesContext } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoutes from "./pages/ProtectedRoutes";
import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  // const BASE_URL = "http://localhost:7000";

  return (
    <CitiesContext>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product></Product>} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate to="city" replace />} />
                <Route path="city" element={<CityList />} />
                <Route path="city/:id" element={<City />} />
                <Route path="country" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesContext>
  );
}

export default App;

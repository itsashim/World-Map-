import { useContext } from "react";
import { CitiesProvider } from "./CitiesContext";

function useCities() {
  const context = useContext(CitiesProvider);
  if (context === undefined) {
    throw new Error("this is because you placed state outside the context");
  }
  return context;
}

export { useCities };

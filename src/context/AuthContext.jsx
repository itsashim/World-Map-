import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();

const initialState = { user: null, isAuth: false };

const reducer = function (state, action) {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    }
    case "logout": {
      return { ...state, user: null, isAuth: false };
    }
    default: {
      throw new Error("Error In Authentication");
    }
  }
};
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);
  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Used useAuth outside the authcontex.Provider");
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};
export { AuthProvider, useAuth };

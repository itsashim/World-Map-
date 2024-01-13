import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import PropTypes from "prop-types";
function ProtectedRoutes({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuth) {
        navigate("/");
      }
    },
    [isAuth, navigate]
  );
  return isAuth ? children : null;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoutes;

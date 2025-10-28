import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = ({ children }) => {
  const token = Cookies.get("jwt_token");
  console.log(token);

  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectRoute;

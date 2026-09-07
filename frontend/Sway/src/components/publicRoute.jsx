import useAuth from "../context/useAuth";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user, loader } = useAuth();

  if (loader) {
    return <h1>Loading..</h1>;
  }

  if (user) {
    return <Navigate to="/home"  />;
  }

  return children;
}

export default PublicRoute;



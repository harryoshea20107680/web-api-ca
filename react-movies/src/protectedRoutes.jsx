import { useContext } from "react"; 
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from './contexts/authContext';

const ProtectedRoutes = () => {

  const auth = useContext(AuthContext);
  const location = useLocation();

  return auth.isAuthenticated === true ? (
    <Outlet /> 
  ) : (
    <Navigate to='/login' replace state={{ from: location.pathname }}/>
  );
};

export default ProtectedRoutes;

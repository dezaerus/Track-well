import { useSelector } from "react-redux/es/hooks/useSelector";
import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
    const user = useSelector((state) => state.id)
    return user
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to="/profile" />;
}

export default ProtectedRoutes
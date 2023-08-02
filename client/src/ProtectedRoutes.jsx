import { useSelector } from "react-redux/es/hooks/useSelector";
import { Outlet, useNavigate } from "react-router-dom";
import ProfilePage from "scenes/profilePage";

const useAuth = () => {
    const user = useSelector((state) => state.id)
    return user
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    
  return !isAuth ? <Outlet /> : <ProfilePage />
}

export default ProtectedRoutes
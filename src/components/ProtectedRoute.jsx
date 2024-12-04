import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ requiredRole }){
    const { user } = useAuth();

    console.log(user);
    if(!user){
        return <Navigate to="/login"/>
    }

    if(requiredRole && user.role !== requiredRole){
        return <Navigate to="/panel" />
    }

    return <Outlet />
};
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const isLoggedIn = useAuth();

    if (!isLoggedIn && isLoggedIn !== null) return <Navigate to="/login" replace />;

    return <Outlet />;
}
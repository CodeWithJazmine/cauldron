import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // TODO: create a loading component
        return <div><p>Loading...</p></div>
    }
    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />
    }

    return children;
}

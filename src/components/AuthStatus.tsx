import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function AuthStatus() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        // TODO: Create not logged in component?
        return <p>You are not logged in.</p>
    }

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return (
        <p>
            Welcome {user.email}!{" "}
            <button onClick={handleLogout}>
                Sign out
            </button>
        </p>
    )
}
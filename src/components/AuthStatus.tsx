import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/constants"


export default function AuthStatus() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        // TODO: Create not logged in component?
        return (
            <p>Sign in to use Cauldron.</p>
        )
    }

    const handleLogout = async () => {
        await logout();
        navigate(ROUTES.HOME);
    }

    return (
        <button onClick={handleLogout}>Sign out</button>
    )
}
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../constants/constants"


export default function AuthStatus() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        // TODO: Create not logged in component?
        return (
            <nav>
                <Link to={ROUTES.SIGNIN} className="button">Sign In</Link>
            </nav>
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
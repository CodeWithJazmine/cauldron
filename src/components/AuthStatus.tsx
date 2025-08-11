import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/constants"


export default function AuthStatus() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        // TODO: Create not logged in component?
        return (
            <div>
                <p>Sign in to use Cauldron.</p>
            </div>
        )
    }

    const handleLogout = async () => {
        await logout();
        navigate(ROUTES.HOME);
    }


    return (
        <div className="auth-status">
            <p>Welcome {user.email?.split('@')[0]}!{" "}</p>
            <button onClick={handleLogout}>
                Sign out
            </button>
        </div >
    )
}
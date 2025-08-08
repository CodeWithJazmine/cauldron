import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";


export function AuthStatus() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        // TODO: Create not logged in component?
        return (
            <div>
                <p>You are not logged in.</p>
                <nav>
                    <Link to="/auth">Sign In</Link>
                </nav>
            </div>
        )
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
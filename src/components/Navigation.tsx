import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/constants"

export default function Navigation() {
    const { user } = useAuth();

    return (
        <div>
            {!user ? (
                <nav>
                    <Link to={ROUTES.SIGNIN} className="button">Sign In</Link>
                </nav>
            ) : null}
            {user ? (
                <nav className="nav">
                    <Link to={ROUTES.HOME}>Home</Link> | <Link to={ROUTES.RECIPES}>Recipes</Link>
                </nav>
            ) : null}
        </div>
    )
}
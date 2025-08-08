import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navigation() {
    const { user } = useAuth();

    return (
        <div>
            {!user ? (
                <nav>
                    <Link to="/auth">Sign In</Link>
                </nav>
            ) : null}
            {user ? (
                <nav>
                    <Link to="/">Home</Link> | <Link to="/recipes">Recipes</Link>
                </nav>
            ) : null}
        </div>
    )
}
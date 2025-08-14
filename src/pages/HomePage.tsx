import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/constants"

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="centered-content">
            <p>Welcome to Cauldron! Your recipe management app.</p>
            <p><em>Build recipes. Test logic. Stay organized.</em></p>

            {!user ? (
                <nav>
                    <Link to={ROUTES.SIGNUP} className="button">Sign Up</Link>
                </nav>
            ) : null}
        </div>
    )
}
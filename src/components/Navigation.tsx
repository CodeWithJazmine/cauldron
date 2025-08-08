import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navigation() {
    const { user } = useAuth();

    {/*TODO: Move styling to .css!*/ }
    const buttonStyle = {
        display: 'inline-block',
        padding: '0.5rem 1rem',
        backgroundColor: '#4a5568',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
    }

    return (
        <div>
            {!user ? (
                <nav>
                    <Link to="/auth" style={buttonStyle}>Sign In</Link>
                </nav>
            ) : null}
            {user ? (
                <nav style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/">Home</Link> | <Link to="/recipes">Recipes</Link>
                </nav>
            ) : null}
        </div>
    )
}
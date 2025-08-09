import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/constants"


export default function AuthStatus() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    {/*TODO: Move styling to .css!*/ }

    const buttonStyle = {
        display: 'inline-block',
        padding: '0.5rem 1rem',
        backgroundColor: '#4a5568',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
    }

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
        //  TODO: Move styling to .css!
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1rem 0'
        }}>
            <p>Welcome {user.email?.split('@')[0]}!{" "}</p>
            <button style={buttonStyle} onClick={handleLogout}>
                Sign out
            </button>
        </div >
    )
}
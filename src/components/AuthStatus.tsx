import { useAuth } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export function AuthStatus() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    if (!user) {
        return (
            <div className="auth-status">
                <Link to="/auth">
                    <button>Sign In</button>
                </Link>
            </div>
        )
    }

    const handleLogout = async () => {
        await logout()
        navigate("/")
    }

    const displayName = user.email?.split('@')[0] || 'User'

    return (
        <div className="auth-status">
            <span>Welcome, {displayName}!</span>
            <button onClick={handleLogout}>
                Sign Out
            </button>
        </div>
    )
}
import SignInForm from "../components/SignInForm"
import { ROUTES } from '../constants/constants'
import { Link } from "react-router-dom";

export default function SignIn() {
    return (
        <div className="centered-page">
            <Link to={ROUTES.HOME}><h1>Cauldron</h1></Link>
            <SignInForm />
            <SignInPrompt />
        </div>
    )
}

function SignInPrompt() {
    return (
        <p>
            Don't have an account? <Link to={ROUTES.SIGNUP}>Sign up</Link>
        </p>
    )
}
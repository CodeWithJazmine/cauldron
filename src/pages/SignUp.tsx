import SignUpForm from '../components/SignUpForm'
import { ROUTES } from '../constants/constants'
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <div className="centered-page">
            <h1>Cauldron</h1>
            <SignUpForm />
            <SignUpPrompt />
        </div>
    )
}

function SignUpPrompt() {
    return (
        <p>
            Have an account? <Link to={ROUTES.SIGNIN}>Sign in</Link>
        </p>
    )
}
import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, useLocation } from 'react-router-dom'
import { SUCCESS_MESSAGE_TIMEOUT_MS } from '../constants/constants'

export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('')
                // Redirect after successful sign-in
                navigate(from, { replace: true })
            }, SUCCESS_MESSAGE_TIMEOUT_MS)

            return () => clearTimeout(timer)
        }
    }, [successMessage, navigate, from])

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()

        // Clear success and error messages on a new attempt
        setSuccessMessage('')
        setErrorMessages([])

        try {
            await signInWithEmailAndPassword(auth, email, password)

            setSuccessMessage('Signed in successfully!')

            setEmail('')
            setPassword('')
        } catch (err) {
            console.error(err)
            setErrorMessages(['Failed to sign in. Please try again.'])
            // TODO: Create more helpful failed account creation messages. (e.g. Invalid email address, etc)
        }
    }

    // TODO: Create "Forgot Password" form
    return (
        <div className='auth-form-container'>

            <form className="auth-form" onSubmit={handleSignIn}>
                <h2>Sign In</h2>
                {successMessage && (<div className='success-message'>{successMessage}</div>)}
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

                <button type='submit'>Sign In</button>

                {errorMessages.length > 0 && (<div className='error-message'>
                    <ul className='error-list'>
                        {errorMessages.map((msg, idx) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>
                </div>)}
            </form>
        </div>
    )
}
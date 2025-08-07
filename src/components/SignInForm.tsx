import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../firebase'
import { SUCCESS_MESSAGE_TIMEOUT_MS } from '../constants/ui'

export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('')
                navigate(from, { replace: true })
            }, SUCCESS_MESSAGE_TIMEOUT_MS)

            return () => clearTimeout(timer)
        }
    }, [successMessage, navigate, from])

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccessMessage('')
        setErrorMessages([])

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setSuccessMessage('Welcome back! Redirecting...')
            setEmail('')
            setPassword('')
        } catch (err: any) {
            console.error(err)
            let errorMessage = 'Failed to sign in. Please try again.'

            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password.'
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.'
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.'
            }

            setErrorMessages([errorMessage])
        } finally {
            setLoading(false)
        }
    }

    // TODO: Create "Forgot Password" form
    return (
        <form onSubmit={handleSignIn} className="auth-form">
            <h2>Welcome Back!</h2>

            {from !== "/" && (
                <div className="redirect-notice">
                    Please sign in to access {from}
                </div>
            )}

            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}

            {errorMessages.length > 0 && (
                <div className="error-messages">
                    <ul>
                        {errorMessages.map((msg, idx) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="form-group">
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email Address'
                    className="form-input"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className="form-input"
                    required
                    disabled={loading}
                />
            </div>

            <button
                type='submit'
                className="form-button"
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    )
}
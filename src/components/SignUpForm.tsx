import { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, validatePassword } from 'firebase/auth'
import { auth } from '../firebase'
import { SUCCESS_MESSAGE_TIMEOUT_MS } from '../constants/ui'

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('')
            }, SUCCESS_MESSAGE_TIMEOUT_MS)

            return () => clearTimeout(timer)
        }
    }, [successMessage])

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccessMessage('')

        if (password !== confirmPassword) {
            setErrorMessages(['Passwords do not match.'])
            setLoading(false)
            return
        }

        const status = await validatePassword(getAuth(), password)
        if (!status.isValid) {
            const messages: string[] = []

            if (status.containsUppercaseLetter === false) {
                messages.push("Password must contain at least one uppercase letter.")
            }
            if (status.containsLowercaseLetter === false) {
                messages.push("Password must contain at least one lowercase letter.")
            }
            if (status.containsNumericCharacter === false) {
                messages.push("Password must contain at least one number.")
            }
            if (status.containsNonAlphanumericCharacter === false) {
                messages.push("Password must contain at least one special character.")
            }
            if (status.meetsMinPasswordLength === false) {
                messages.push("Password must be at least 6 characters long.")
            }

            setErrorMessages(messages)
            setLoading(false)
            return
        }

        setErrorMessages([])

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setSuccessMessage('Account created successfully! You can now sign in.')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        } catch (err: any) {
            console.error(err)
            let errorMessage = 'Failed to create account. Please try again.'

            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'An account with this email already exists.'
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.'
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please choose a stronger password.'
            }

            setErrorMessages([errorMessage])
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSignUp} className="auth-form">
            <h2>Join Cauldron</h2>

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

            <div className="form-group">
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
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
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    )
}
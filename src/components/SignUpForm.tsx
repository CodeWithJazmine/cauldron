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

        // Clear success message on a new attempt
        setSuccessMessage('')

        // Passwords must match
        if (password !== confirmPassword) {
            setErrorMessages(['Passwords do not match.'])
            return
        }

        // Validate against Firebase password policy
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
            return
        }

        // Clear old errors before trying account creation
        setErrorMessages([])

        try {
            await createUserWithEmailAndPassword(auth, email, password)

            setSuccessMessage('Account created successfully!')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        } catch (err) {
            console.error(err)
            setErrorMessages(['Failed to create account. Please try again.'])
            // TODO: Create more helpful failed account creation messages. (e.g. Email in use, invalid email address, etc)
        }
    }

    return (
        <>
            {successMessage && (
                <div style={{ color: 'green' }}>{successMessage}</div>
            )}

            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                {errorMessages.length > 0 && (
                    <div style={{ color: 'red' }}>
                        <ul>
                            {errorMessages.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                <button type='submit'>Sign Up</button>
            </form>
        </>
    )
}
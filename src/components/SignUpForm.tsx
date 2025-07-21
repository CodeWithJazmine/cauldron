import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, validatePassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const [successMessage, setSuccessMessage] = useState('')

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        const status = await validatePassword(getAuth(), password)
        if (!status.isValid) {
            // Password could not be validated. 
            // Use status to show what requirements are met and which are missing.
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

        // clear the error messages
        setErrorMessages([])

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setSuccessMessage('Account created successfully!')
            setEmail('')
            setPassword('')
        } catch (err) {
            console.error(err)
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
                <button type='submit'>Sign Up</button>
            </form>
        </>
    )
}
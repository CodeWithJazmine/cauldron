import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log('User created!')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button type='submit'>Sign Up</button>
        </form>
    )
}
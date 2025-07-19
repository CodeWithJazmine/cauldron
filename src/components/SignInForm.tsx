import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log('User signed in!')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button type='submit'>Sign In</button>
        </form>
    )
}
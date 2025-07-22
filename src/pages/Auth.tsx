import { useState } from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'
import './Auth.css'

export default function Auth() {
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')

    return (
        <div className="auth-page">
            <div className="auth-container">
                <Link to="/" className="back-to-home">
                    ← Back to Home
                </Link>

                <div className="auth-header">
                    <h1>Cauldron</h1>
                    <p>Join the magical recipe community</p>

                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
                            onClick={() => setActiveTab('signin')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                            onClick={() => setActiveTab('signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className="auth-content">
                    <div className="auth-form-container">
                        {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}
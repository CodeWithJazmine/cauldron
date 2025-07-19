// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { db } from './firebase'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'

function App() {
  console.log("Firebase DB instance:", db)

  return (
    <div>
      <h1>Cauldron</h1>
      <p><em>Build recipes. Test logic. Stay organized.</em></p>
      <SignUpForm />
      <SignInForm />
    </div>
  )
}

export default App

import './App.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AuthStatus } from './components/AuthStatus'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Cauldron</h1>
            <p>Build recipes. Test logic. Stay organized.</p>
          </div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <AuthStatus />
          </nav>
        </div>
      </header>

      <main className="main-content">
        {isHomePage ? <HomePage /> : <Outlet />}
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <h2>Visually Build, Manage, and Export Crafting Recipes</h2>
        <p>
          Cauldron is your all-in-one visual editor for game crafting systems.
          Design recipes, manage item data, and export to CSV or JSON for Unity, Unreal, and more.
        </p>
        <Link to="/recipes">
          <button className="cta-button">
            Try the Recipe Builder
          </button>
        </Link>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <h3>Visual Recipe Builder</h3>
          <p>
            Easily create input/output combinations with intuitive forms — no spreadsheets required.
          </p>
        </div>

        <div className="feature-card">
          <h3>Item Library</h3>
          <p>
            Manage a custom set of ingredients, materials, or components for use in all your recipes.
          </p>
        </div>

        <div className="feature-card">
          <h3>Export to Game Engines</h3>
          <p>
            One-click export to clean JSON or CSV — optimized for Unity, Unreal, and other engines.
          </p>
        </div>

        <div className="feature-card">
          <h3>Your Recipes, Your Account</h3>
          <p>
            Sign in securely with Firebase Auth and access your recipe data from anywhere.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
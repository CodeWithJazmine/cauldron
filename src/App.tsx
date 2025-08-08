import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "./components/AuthStatus";
import { useAuth } from "./contexts/AuthContext";



function App() {
  const { user, loading } = useAuth();

  return (
    <div>
      <h1>Cauldron</h1>
      <p><em>Build recipes. Test logic. Stay organized.</em></p>

      <AuthStatus />

      {user ? (
        <nav>
          <Link to="/">Home</Link> | <Link to="/recipes">Recipes</Link>
        </nav>
      ) : null}

      <Outlet />
    </div>
  )
}

export default App

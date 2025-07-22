import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "./components/AuthStatus";

function App() {
  return (
    <div>
      <h1>Cauldron</h1>
      <p><em>Build recipes. Test logic. Stay organized.</em></p>

      <AuthStatus />

      <nav>
        <Link to="/">Home</Link> | <Link to="/recipes">Recipes</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default App

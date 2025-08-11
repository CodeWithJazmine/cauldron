import "./App.css";
import { Outlet } from "react-router-dom";
import AuthStatus from "./components/AuthStatus";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <div>
      {/* Shared content between all pages */}
      <div className="header">
        <h1>Cauldron</h1>
        <Navigation />
        <AuthStatus />
      </div>

      {/* Outlet is used to render whichever child route matched the current URL*/}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
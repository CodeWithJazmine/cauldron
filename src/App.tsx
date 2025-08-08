import "./App.css";
import { Outlet } from "react-router-dom";
import AuthStatus from "./components/AuthStatus";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <div>
      {/* Shared content between all pages */}
      <h1>Cauldron</h1>
      <div>
        <AuthStatus />
        <Navigation />
      </div>

      {/* Outlet is used to render whichever child route matched the current URL*/}
      <Outlet />
    </div>
  )
}
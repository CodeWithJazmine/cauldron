import "./App.css";
import { Outlet } from "react-router-dom";
import { AuthStatus } from "./components/AuthStatus";
import { Navigation } from "./components/Navigation";



function App() {


  return (
    <div>
      <h1>Cauldron</h1>

      <AuthStatus />
      <Navigation />
      <Outlet />

      <p><em>Build recipes. Test logic. Stay organized.</em></p>



    </div>
  )
}

export default App

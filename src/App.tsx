import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet /> {/* Outlet is used to render whichever child route matched the current URL*/}
      </main>
    </>
  )
}
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import AuthStatus from "./AuthStatus";
import { ROUTES } from "../constants/constants";

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <div className="brand">
                    <Link to={ROUTES.HOME} className="brand__link"><h1>Cauldron</h1></Link>
                </div>

                <nav className="primary-nav">
                    <Navigation />
                </nav>

                <div className="account">
                    <AuthStatus />
                </div>
            </div>
        </header>
    )
}
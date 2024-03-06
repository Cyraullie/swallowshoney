import logo from "../assets/logo.png"
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
    <div className="Header">
      <nav>
        <Link className="link" to="product">Product</Link>
        <Link className="link" to="aboutus">À propos</Link>
        
        <Link className="link" to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        <Link className="link" to="contact">Contact</Link>
        <Link className="link" to="account">Compte</Link>
      </nav>
    </div>
    <Outlet />
    </>
    
  );
}

export default Header;

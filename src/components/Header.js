import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import { BasketContext } from './BasketContext';
import Basket from "./Basket";
import Login from "./LoginPanel";

const Header = ({ setIsLoged, isLoged, isDisplayedLogin, setIsDisplayedLogin }) => {
	const navigate = useNavigate();
  const { basketContent } = useContext(BasketContext);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isDisplayedSmall, setIsDisplayedSmall] = useState(false);
  const [isDisplayedAccount, setIsDisplayedAccount] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const basketRef = useRef(null);
  const basketRefSmall = useRef(null);

  useEffect(() => {
    login();
    
    function handleClickOutside(event) {
      // Vérifiez si le clic se produit en dehors du panier
      if (basketRef.current && !basketRef.current.contains(event.target)) {
        setIsDisplayed(false);
      }

      if (basketRefSmall.current && !basketRefSmall.current.contains(event.target)) {
        setIsDisplayedSmall(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function login() {
    let user_id = localStorage.getItem("user_id");

    if (user_id != null)
      setIsLoged(true);
    else
    {
      setIsLoged(false);
      localStorage.removeItem("user_id");
    }
  }

  function handleClick(event) {
    event.stopPropagation(); // Empêche la propagation du clic
    setIsDisplayed(!isDisplayed);
  }

  function handleClickSmall(event) {
    event.stopPropagation(); // Empêche la propagation du clic
    setIsDisplayedSmall(!isDisplayedSmall);
  }

  function handleClickLogin() {
    setIsDisplayedLogin(!isDisplayedLogin);
  }

  function handleClickAccount() {
    setIsDisplayedAccount(!isDisplayedAccount);
  }

  function handleClickUnlog() {
    localStorage.removeItem("user_id");
    setIsDisplayedAccount(false);
    login();
		navigate(`/`);
  }

  function toggleBurgerMenu() {
    setIsBurgerOpen(!isBurgerOpen);
    if (isSubMenuOpen) {
			toggleSubMenu();
		}
  }

  function toggleSubMenu() {
		setIsSubMenuOpen(!isSubMenuOpen);
	}

  function handleMenuItemClick() {
		if (isBurgerOpen) {
			toggleBurgerMenu(); // Close the burger menu if it's open
		}
	}

  const totalQuantity = basketContent.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="Header">
        
        <nav>
          <div className={`nav-links ${isBurgerOpen ? "open" : ""}`}>
						<Link className="link" to="product" onClick={handleMenuItemClick}>Product</Link>
						<Link className="link" to="aboutus" onClick={handleMenuItemClick}>À propos</Link>
						<Link className="link" to="contact" onClick={handleMenuItemClick}>Contact</Link>
            {isLoged ? (
							<a className="link" onClick={toggleSubMenu}>Profile <span className={`arrow ${isSubMenuOpen ? "rotate" : ""}`}>▼</span></a>
            ) : (
              <a className="link" onClick={() => { handleClickLogin(); handleMenuItemClick(); toggleSubMenu(); }}>Se connecter</a>
            )}
            {isSubMenuOpen ? (
              <>
                <Link  onClick={() => { handleMenuItemClick();  toggleSubMenu(); }} className="link" to="account">Compte</Link>
                <a className="link" onClick={() => { handleClickUnlog(); handleMenuItemClick(); toggleSubMenu(); }}>Se déconnecter</a>
              </>
            ): ""}
					</div>

          <Link className="link large-screen" to="product" onClick={toggleBurgerMenu}>Product</Link>
          <Link className="link large-screen" to="aboutus" onClick={toggleBurgerMenu}>À propos</Link>
					<Link to="/"><img src="/assets/logo.png" className="App-logo" alt="logo" /></Link>
          <Link className="link large-screen" to="contact" onClick={toggleBurgerMenu}>Contact</Link>
					

					{isLoged ? (
						<div className="AccountContainer">
							<a className="link large-screen" style={{marginRight: "10px"}} onClick={handleClickAccount}>Profile</a>
							<div className='AccountPopupArea  large-screen' style={{visibility: isDisplayedAccount ? "visible" : "hidden"}}>
								<Link onClick={handleClickAccount} className="link" to="account">Compte</Link>
								<a className="link" onClick={handleClickUnlog}>Se déconnecter</a>
							</div>
						</div>
					) : (
						<a className="link large-screen" onClick={handleClickLogin}>Se connecter</a>
					)}
					<div className="BasketContainer large-screen" ref={basketRef}>
						<img className="icon" onClick={handleClick} src="/assets/backet.png" alt='icon_panier'></img>
						<span className="basket-quantity">{totalQuantity}</span>
						<div style={{visibility: isDisplayed ? "visible" : "hidden"}}><Basket close={handleClick}/></div>
					</div>
					<div style={{visibility: isDisplayedLogin ? "visible" : "hidden"}}>
						<div className="HideArea"/>
						<Login close={handleClickLogin} login={login}/>
					</div>
        </nav>
        <div className="BasketContainer small-screen" ref={basketRefSmall}>
						<img className="icon" onClick={handleClickSmall} src="/assets/backet.png" alt='icon_panier'></img>
						<span className="basket-quantity">{totalQuantity}</span>
						<div style={{visibility: isDisplayedSmall ? "visible" : "hidden"}}><Basket close={handleClickSmall}/></div>
					</div>
        <div className={`burger-menu ${isBurgerOpen ? "open" : ""}`} onClick={toggleBurgerMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;

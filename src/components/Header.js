import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { BasketContext } from './BasketContext';
import Basket from "./Basket";
import Login from "./LoginPanel";

const Header = ({ setIsLoged, isLoged }) => {
  const { basketContent } = useContext(BasketContext);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isDisplayedLogin, setIsDisplayedLogin] = useState(false);
  const basketRef = useRef(null);

  useEffect(() => {
    login();
    
    function handleClickOutside(event) {
      if (basketRef.current && !basketRef.current.contains(event.target)) {
        setIsDisplayed(false);
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

  function handleClick() {
    setIsDisplayed(!isDisplayed);
  }

  function handleClickLogin() {
    setIsDisplayedLogin(!isDisplayedLogin);
  }

  function handleClickUnlog() {
    localStorage.removeItem("user_id")
    login()
  }

  const totalQuantity = basketContent.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="Header">
        <nav>
          <Link className="link" to="product">Product</Link>
          <Link className="link" to="aboutus">À propos</Link>
          <Link className="link" to="/"><img src="/assets/logo.png" className="App-logo" alt="logo" /></Link>
          <Link className="link" to="contact">Contact</Link>
          {isLoged ? (
            <div>
              <Link className="link" to="account">Compte</Link>/<a className="link" onClick={handleClickUnlog}>Se déconnecter</a>
            </div>
          ) : (
            <a className="link" onClick={handleClickLogin}>Se connecter</a>
          )}
          <div className="BasketContainer" ref={basketRef}>
            <img className="icon" onClick={handleClick} src="/assets/backet.png" alt='icon_panier'></img>
            <span className="basket-quantity">{totalQuantity}</span>
            <div style={{visibility: isDisplayed ? "visible" : "hidden"}}><Basket /></div>
          </div>
          <div style={{visibility: isDisplayedLogin ? "visible" : "hidden"}}>
            <div className="HideArea"/>
            <Login close={handleClickLogin} login={login}/>
          </div>    
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default Header;

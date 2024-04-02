import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from "react-router-dom";
import Basket from "./Basket";

const Header = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const basketRef = useRef(null);

  useEffect(() => {
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

  function handleClick() {
    setIsDisplayed(!isDisplayed);
  }

  return (
    <>
    <div className="Header">
      <nav>
        <Link className="link" to="product">Product</Link>
        <Link className="link" to="aboutus">À propos</Link>
        
        <Link className="link" to="/"><img src="/assets/logo.png" className="App-logo" alt="logo" /></Link>
        <Link className="link" to="contact">Contact</Link>
        <Link className="link" to="account">Compte</Link>
        <div className="BasketContainer" ref={basketRef}>
          <img className="icon" onClick={handleClick} src="/assets/backet.png"></img>
          <div style={{visibility: isDisplayed ? "visible" : "hidden"}}><Basket /></div>
        </div>
      </nav>
      
    </div>
    <Outlet />
    </>
    
  );
}

export default Header;

import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { BasketContext } from './BasketContext';
import Basket from "./Basket";

const Header = () => {
  const { basketContent } = useContext(BasketContext);
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

  const totalQuantity = basketContent.reduce((acc, item) => acc + item.quantity, 0);

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
            <img className="icon" onClick={handleClick} src="/assets/backet.png" alt='icon_panier'></img>
            <span className="basket-quantity">{totalQuantity}</span>
            <div style={{visibility: isDisplayed ? "visible" : "hidden"}}><Basket /></div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default Header;

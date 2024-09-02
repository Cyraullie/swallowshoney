import React, { useContext, useEffect, useState } from 'react';
import BasketArticles from "./BasketArticles";
import { useNavigate, Link } from "react-router-dom";
import { BasketContext } from './BasketContext';

const Basket = ({ close }) => {
  const { basketContent } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      if (basketContent && basketContent.length > 0) {
        const total = basketContent.reduce(
          (acc, item) => {
            acc.totalPrice += item.price * item.quantity;
            acc.totalQuantity += item.quantity;
            return acc;
          },
          { totalPrice: 0, totalQuantity: 0 }
        );
        setTotalPrice(total.totalPrice);
        setTotalQuantity(total.totalQuantity);
      } else {
        setTotalPrice(0);
        setTotalQuantity(0);
      }
    };

    calculateTotal();
  }, [basketContent]);

  return (
    <div className="BasketArea">
      <div className="BasketTitle">
        <span>Panier</span>
      </div>

      {basketContent && basketContent.length > 0 ? (
        <BasketArticles basketContent={basketContent} />
      ) : (
        <div className="BasketArticles">
          <p id="NoBasketContent">Aucun contenu de panier disponible</p>
        </div>
      )}

      <div className="BasketTotalPrice">
        <span>Sous-Total : {totalPrice.toFixed(2)} CHF</span>
      </div>
      <div className="BasketBuy">
        {/* Ajout de l'événement onClick ici */}
        <Link className="BasketBuyButton" to="/order" onClick={close}>
          Passer à la commande
        </Link>
      </div>
    </div>
  );
};

export default Basket;

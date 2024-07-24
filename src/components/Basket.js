import React, { useContext, useEffect, useState } from 'react';
import BasketArticles from "./BasketArticles";
import { Link } from "react-router-dom";
import { BasketContext } from './BasketContext';

const Basket = () => {
  const { basketContent } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      let priceArray = [];
      let totalPrice = 0;
      let totalQuantity = 0;

      if (basketContent != null) {
        for (let i = 0; i < basketContent.length; i++) {
          priceArray.push(basketContent[i].price * basketContent[i].quantity);
          totalQuantity += basketContent[i].quantity;
        }

        for (let i = 0; i < priceArray.length; i++) {
          totalPrice += priceArray[i];
        }
      }
      setTotalPrice(totalPrice);
      setTotalQuantity(totalQuantity);
    };

    calculateTotal();
  }, [basketContent]);

  return (
    <>
      <div className="BasketArea">
        <div className="BasketTitle">
          <a>Panier</a>
        </div>

        {basketContent.length > 0 ? (
          <BasketArticles basketContent={basketContent} />
        ) : (
          <div className="BasketArticles">
            <a id="NoBasketContent">Aucun contenu de panier disponible</a>
          </div>
        )}

        <div className="BasketTotalPrice">
          <a>Sous-Total : {totalPrice.toFixed(2)} CHF</a>
        </div>
        <div className="BasketBuy">
          <Link className="BasketBuyButton" to="order">Passer à la commande</Link>
        </div>
      </div>
    </>
  );
};

export default Basket;

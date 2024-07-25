import React, { useContext, useEffect, useState } from 'react';
import OrderArticles from "../components/OrderArcticles"; // Assurez-vous que le nom du fichier est correct
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BasketContext } from '../components/BasketContext';

const Order = () => {
  const navigate = useNavigate();
  const { basketContent, clearBasket } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let priceArray = [];
    let total = 0;
    for (let i = 0; i < basketContent.length; i++) {
      priceArray.push(basketContent[i].price * basketContent[i].quantity);
    }

    for (let i = 0; i < priceArray.length; i++) {
      total += priceArray[i];
    }
    setTotalPrice(total);
  }, [basketContent]);

  const orderClick = () => {
    const payload = { users_id: 1, basketContent: basketContent, totalPrice: totalPrice };

    axios.post("http://localhost:8000/api/order", payload)
      .then((response) => {
          clearBasket();
          navigate('/');
      })
      .catch(error => {
        console.log(error);
      }); 
  };

  return (
    <div className="body">
      <div className="OrderArea">
        <div className="OrderTitle">
          <a>Commande</a>
        </div>
        <OrderArticles orderContent={basketContent} />
        <div className="OrderTotalPrice">
          <a>Sous-Total : {totalPrice.toFixed(2)} CHF</a>
        </div>
        <div className="OrderDetail">
          <p>La commande ne sera validée que à partir du moment où le paiement est reçu.</p>
          <p>Pour ce faire vous pouvez payer par TWINT au <b>076 324 71 91</b>.</p>
        </div>
        <a className="OrderBuyButton" onClick={orderClick}>Valider la commande</a>
      </div>
    </div>
  );
};

export default Order;

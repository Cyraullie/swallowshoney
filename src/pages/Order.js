import React, { useContext, useEffect, useState } from 'react';
import OrderArticles from "../components/OrderArcticles";
import { BannerContext } from '../components/BannerContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BasketContext } from '../components/BasketContext';
const apiUrl = process.env.REACT_APP_API_URL_DEV;
//TODO verifier si le user_id existe sinon 
//TODO faire un système de facture et plus de payement
//TODO ajouter une zone de texte pour s'il y a des messages
const Order = ({ setIsDisplayedLogin }) => {
  const navigate = useNavigate();
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);
  const { basketContent, clearBasket } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses_id, setAddresses_id] = useState();

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


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11, donc ajouter 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const orderClick = () => {
    let user_id = localStorage.getItem("user_id");
    if (user_id == null)
      setIsDisplayedLogin(true)
    else{

      const payload_user = { id: user_id };
      axios.post(apiUrl + "user", payload_user)
        .then((response) => {
          setAddresses_id(response.data.user.addresses[0].id);
        
        const date = new Date();
        console.log(formatDate(date))
        //, shipping_cost: 0, additional_message: ""
        const payload = { users_id: user_id, basketContent: basketContent, totalPrice: totalPrice, created_date: formatDate(date), addresses_id: response.data.user.addresses[0].id, tva: 0};
        
        console.log(payload)
        axios.post(apiUrl + "order", payload)
          .then((response) => {
            console.log(response)
              clearBasket();
              setShowBanner(true);
              setMessage("Votre commande a bien été créée");
              setType("success");
              setTimeout(() => {
                setShowBanner(false);
              }, 3000);
              navigate('/');
          })
          .catch(error => {
            setShowBanner(true);
            setMessage(error.response.data.message);
            setType("error");
            setTimeout(() => {
              setShowBanner(false);
            }, 3000);
          });
        })
      .catch(error => {
      console.log(error);
      });
    }
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

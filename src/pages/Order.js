import React, { useContext, useEffect, useState } from 'react';
import OrderArcticles from "../components/OrderArcticles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BasketContext } from '../components/BasketContext';

const Order = () => {
  const { basketContent } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

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

  function orderClick() {

    /*let payload = {users_id: localStorage.getItem("users_id"), basketContent: basketContent, totalPrice: totalPrice}


    axios.post("http://localhost:8000/api/order", payload)
            .then((response) => {
                
                //console.log(response.data)
                //localStorage.removeItem("basketContent")
                navigate('/')

            })
            .catch(error => {
            console.log(error);
            });
           */
  }

    return (
      <div className="body">

        <div className="OrderArea">
            <div className="OrderTitle">
                <a>Commande</a>
            </div>
            <OrderArcticles orderContent={basketContent}/>

                    
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
  
import OrderArcticles from "../components/OrderArcticles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();

  let basketContent = JSON.parse(localStorage.getItem('basketContent'));
  let priceArray = []
  for(let i = 0; i < basketContent.length; i++) {
    priceArray.push(basketContent[i].price * basketContent[i].quantity)
  }
  let totalPrice = 0;

  for(let i = 0; i < priceArray.length; i++) {
    totalPrice += priceArray[i]
  }

  function orderClick() {

    let payload = {users_id: localStorage.getItem("users_id"), basketContent: basketContent, totalPrice: totalPrice}


    axios.post("http://localhost:8000/api/order", payload)
            .then((response) => {
                
                //console.log(response.data)
                //localStorage.removeItem("basketContent")
                navigate('/')

            })
            .catch(error => {
            console.log(error);
            });

           
  }

    return (
      <div className="body">

        <div className="OrderArea">
            <div className="OrderTitle">
                <a>Commande</a>
            </div>
            <OrderArcticles orderContent={basketContent}/>

                    
            <div className="OrderTotalPrice">
                <a>Sous-Total : {totalPrice} CHF</a>
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
  
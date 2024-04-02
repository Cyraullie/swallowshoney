import OrderArcticles from "../components/OrderArcticles";

const Order = () => {

  let basketContent = JSON.parse(localStorage.getItem('basketContent'));
  let priceArray = []
  for(let i = 0; i < basketContent.length; i++) {
    priceArray.push(basketContent[i].price * basketContent[i].quantity)
  }
  let totalPrice = 0;

  for(let i = 0; i < priceArray.length; i++) {
    totalPrice += priceArray[i]
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
            
            <a>La commande ne sera validée que à partir du moment où le paiement est reçu.</a>
            <a>Pour ce faire vous pouvez payer par TWINT au <b>076 324 71 91</b>.</a>
    
            <a className="OrderBuyButton">Valider la commande</a>
        </div>
    </div>
    );
  };
  
  export default Order;
  
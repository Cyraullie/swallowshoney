import BasketArticles from "./BasketArticles";
import { Link } from "react-router-dom";


const Basket = () => {

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
    <>
    <div className="BasketArea">
        <div className="BasketTitle">
            <a>Panier</a>
        </div>
        <BasketArticles basketContent={basketContent}/>

        
        <div className="BasketTotalPrice">
            <a>Sous-Total : {totalPrice} CHF</a>
        </div>
        <div className="BasketBuy">
          
            <Link className="BasketBuyButton" to="order">Passer à la commande</Link>
        </div>
        
    </div>
    </>
    
  );
}

export default Basket;

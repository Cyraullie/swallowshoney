import BasketArticles from "./BasketArticles";
import { Link } from "react-router-dom";


const Basket = () => {

  let basketContent = JSON.parse(localStorage.getItem('basketContent'));
  let priceArray = []
  let totalPrice = 0;

  if(basketContent != null){
    for(let i = 0; i < basketContent.length; i++) {
      priceArray.push(basketContent[i].price * basketContent[i].quantity)
    }

  for(let i = 0; i < priceArray.length; i++) {
    totalPrice += priceArray[i]
  }
  
} 

  return (
    <>
    <div className="BasketArea">
        <div className="BasketTitle">
            <a>Panier</a>
        </div>

        {basketContent != null ? (
          <BasketArticles basketContent={basketContent}/>
        ) : (
          <div className="BasketArticles"><a id="NoBasketContent">Aucun contenu de panier disponible</a></div>
        )}

        
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

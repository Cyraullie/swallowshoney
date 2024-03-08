//TODO faire le redirection vers la page des details d'un produit
//TODO faire l'ajout au panier d'un produit

//<a className="CardDetailsButton" href={"/details/" + data.productId}>Détails {data.productId}</a>
import React, { Component} from 'react';

function Card(data) {
  const [value, setValue] = React.useState();

    return (
      <div className="CardArea">
          
          {data.discount !== 0 ? (
            <div className='CardDiscount'>{data.discount}%</div>
          ) : null}
          <div className="CardImage"><img src={"/assets/"+ data.imgsrc}></img></div>
          <div className="CardName"><a className="CardTitle">{data.title}</a></div>
          <div className='CardDescription'><a>{data.description}</a></div>
          <div className='CardPrice'>{data.price} CHF/unité</div>
          <div className="CardButtons">
            
            <input className="CardNumberButton" type="number" min={1} defaultValue={1}></input>
            <div className="CardBuyButton">Acheter {data.productId}</div>
          </div>
          
      </div>
    );
  }
  
  export default Card;
  
//TODO faire en sorte que quand on ajout un produit qui est deja dans le panier il s'additionne plutot que de rajouter une ligne
import React, { Component, useState } from 'react';
import axios from "axios";

function Card(data) {
  const [inputValue, setInputValue] = useState(1);

  const changeQuantity = (event) => {

    setInputValue(event.target.valueAsNumber);
  }

  const renderQuantityText = (quantity) => {
    if (quantity > 5) {
      return <span>En stock</span>;
    } else if (quantity > 0) {
      return <span>Stock faible</span>;
    } else {
      return <span>Rupture de stock</span>;
    }
  }


  const handleClick = (productId) => {
    
    axios.get("http://localhost:8000/api/product/"+productId)
    .then((response) => {

      let basketContent = JSON.parse(localStorage.getItem('basketContent'));
      if(basketContent != null){
        basketContent.push({id: response.data.id, name: response.data.name, quantity: inputValue, price: response.data.price });
      }else {
        basketContent = [{id: response.data.id, name: response.data.name, quantity: inputValue, price: response.data.price }]
      }
      localStorage.setItem('basketContent', JSON.stringify(basketContent));
    })
    .catch(error => {
    console.log(error);
    });
  }

    return (
      <div className="CardArea">
          
          {data.discount !== 0 && (
            <div className='CardDiscount'>{data.discount}%</div>
          )}
          <div className="CardImage"><img src={"/assets/"+ data.imgsrc}></img></div>
          <div className="CardName"><a className="CardTitle">{data.title}</a></div>
          <div className='CardDescription'><a>{data.description}</a></div>
          <div className='CardPrice'>{data.price} CHF/unité</div>
          <div className='CardQuantity'>{renderQuantityText(data.quantity)}</div>
          <div className="CardButtons">
            
            <input className="CardNumberButton" onChange={changeQuantity} type="number" min={1} defaultValue={1} max={data.quantity}></input>
            <a className="CardBuyButton" onClick={() => handleClick(data.productId)}>Acheter</a>
          </div>
          
      </div>
    );
  }
  
  export default Card;
  
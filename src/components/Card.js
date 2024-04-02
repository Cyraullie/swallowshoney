//TODO faire le redirection vers la page des details d'un produit
//TODO faire l'ajout au panier d'un produit

//<a className="CardDetailsButton" href={"/details/" + data.productId}>Détails {data.productId}</a>
import React, { Component, useState } from 'react';
import axios from "axios";

function Card(data) {
  const [inputValue, setInputValue] = useState(1);
/*
const basketContentTest = [
  { id: 1, name: "miel", quantity: 5, price: 15.50 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 2, name: "hydromel", quantity: 20, price: 25.00 },
  { id: 3, name: "hydromel piquant", quantity: 30, price: 30.00}
];

localStorage.setItem('basketContent', JSON.stringify(basketContentTest));
  
*/

const changeQuantity = (event) => {

  setInputValue(event.target.valueAsNumber);
}

const handleClick = (productId) => {
  
    axios.get("http://localhost:8000/api/product/"+productId)
    .then((response) => {
      let basketContent = JSON.parse(localStorage.getItem('basketContent'));
      basketContent.push({id: response.data.id, name: response.data.name, quantity: inputValue, price: response.data.price });
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
          <div className="CardButtons">
            
            <input className="CardNumberButton" onChange={changeQuantity} type="number" min={1} defaultValue={1}></input>
            <a className="CardBuyButton" onClick={() => handleClick(data.productId)}>Acheter {data.productId}</a>
          </div>
          
      </div>
    );
  }
  
  export default Card;
  
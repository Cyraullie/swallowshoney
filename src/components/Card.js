//TODO ajouter une bannière pour dire que le produit a bien été ajouté au panier
import React, { useContext, useState } from 'react';
import axios from "axios";
import { BannerContext } from './BannerContext';

function Card(data) {
	const [inputValue, setInputValue] = useState(1);
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);

	const changeQuantity = (event) => {
		setInputValue(event.target.valueAsNumber);
	}

	const renderQuantityText = (quantity) => {
	if (quantity > 5) {
      return <span>En stock</span>;
    } else if (quantity > 0) {
      return <span>Stock faible</span>;
    } else {
      return <span>Rupture de stock - fabrication en cours</span>;
    }
  }


  const handleClick = (productId) => {
    
    axios.get("http://localhost:8000/api/product/"+productId)
    .then((response) => {

      let basketContent = JSON.parse(localStorage.getItem('basketContent'));
      let find = false;

      if(basketContent != null){
        for(let i = 0; i < basketContent.length; i++) {
          if (response.data.id == basketContent[i].id)
          {
            basketContent[i].quantity += inputValue;
            find = true;
            break;
          }
        }
        if (!find)
          basketContent.push({id: response.data.id, name: response.data.name, quantity: inputValue, price: response.data.price });
      }else {
        basketContent = [{id: response.data.id, name: response.data.name, quantity: inputValue, price: response.data.price }]
      }
      localStorage.setItem('basketContent', JSON.stringify(basketContent));
	  setShowBanner(true);
	  setMessage("Produit ajouté au panier avec succès !");
	  setType("success");
    })
    .catch(error => {
		console.log(error);
		setShowBanner(true);
		setMessage("Une erreur c'est produite !");
		setType("error");
	});
	setTimeout(() => {
		setShowBanner(false);
	  }, 3000);
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
            
            <input className="CardNumberButton" onChange={changeQuantity} type="number" min={1} defaultValue={1}></input>
            <a className="CardBuyButton" onClick={() => handleClick(data.productId)}>Acheter</a>
          </div>
          
      </div>
    );
  }
  
  export default Card;
  
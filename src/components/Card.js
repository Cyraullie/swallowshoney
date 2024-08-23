//TODO fix style
import React, { useContext, useState } from 'react';
import axios from "axios";
import { BannerContext } from './BannerContext';
import { BasketContext } from './BasketContext';
const apiUrl = process.env.REACT_APP_API_URL_DEV;
const fileUrl = process.env.REACT_APP_FILE_URL_DEV;

function Card(data) {
	const [inputValue, setInputValue] = useState(1);
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);
	const { addToBasket } = useContext(BasketContext);

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
	
	axios.get(apiUrl + "product/"+productId)
	.then((response) => {    
		const product = {id: response.data.id, name: response.data.name, quantity: inputValue, price: response.data.price }
		addToBasket(product);
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
		<div>
			{data.discount !== 0 && (
				<div className='CardDiscount'>{data.discount}%</div>
			)}
			<div>
				<div className="CardImage"><img src={fileUrl + data.imgsrc}></img></div>
			</div>
			<div style={{ width: "100%" }}>
				<div className="CardName"><a className="CardTitle">{data.title}</a></div>
				<div className='CardDescription'><a>{data.description}</a></div>
			</div>
		</div>
		
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

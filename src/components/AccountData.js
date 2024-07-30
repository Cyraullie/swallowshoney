import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
//import { BannerContext } from './BannerContext';

function AccountData() {
	const [data, setData] = useState([]);
	const [title, setTitle] = useState("données personnelles");
	const [display, setDisplay] = useState("profile");
	//const { setShowBanner, setMessage, setType } = useContext(BannerContext);

	useEffect(() => {
		let user_id = localStorage.getItem("user_id");
		const payload = { id: user_id };
		axios.post("http://localhost:8000/api/user", payload)
            .then((response) => {
                setData(response.data.user);
				console.log(response.data.user.addresses.length)
            })
            .catch(error => {
            console.log(error);
            });
	}, []);

	const handleClick = (type) => {
		switch (type) {
            case 'profile':
				setTitle("données personnelles");
				setDisplay("profile");
				break;
			case 'address':
				setTitle("mes adresses");
				setDisplay("address");
				break;
			case 'order':
				setTitle("mes commandes");
				setDisplay("order");
				break;
			case 'password':
				setTitle("gestion de mot de passe");
				setDisplay("password");
				break;
		}
		console.log(title)
	}

	return (
		<>
			<div className='AccountTitle'>
				<h1>{ title.toUpperCase() }</h1>
			</div>
			<div className="AccountArea">
				<div className="AccountMenuArea">
				<a>Bienvenue, { data.firstname}</a>
				<a onClick={() => handleClick("profile")}>Profil</a>
				<a onClick={() => handleClick("address")}>Carnet d'adresse</a>
				<a onClick={() => handleClick("order")}>Mes commandes</a>
				<a onClick={() => handleClick("password")}>Gérer le mot de passe</a>

					
				</div>
				
				<div className="AccountDataArea">
					{display == "profile" && 
					<>
						<a>{ data.firstname } { data.lastname }</a>
						<a>{ data.email }</a>
						<a>{ data.phone }</a>
					</>
					}
					{display == "address" && 
						data.addresses.map((address, index) => (
							<div key={index}>
							  <a>{address.address}</a>
							  <a>
								{address.npa} {address.city}
							  </a>
							  <a>{address.country}</a>
							</div>
						))}
					{display == "order" && 
						data.orders.map((order, index) => (
							<div key={index}>
							  <a>Date de création {order.created_date}</a>
							  <a>Numéro de commande {order.nb_order}</a>
							  <a>Prix total - CHF {order.total_price}</a>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default AccountData;

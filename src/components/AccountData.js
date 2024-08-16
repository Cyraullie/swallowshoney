import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
//import { BannerContext } from './BannerContext';
//TODO list des commandes
//TODO donnée personnel
//TODO modification du mot de passe
//TODO modification de l'adresse
//TODO modification des donnée personnel
function AccountData() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [title, setTitle] = useState("données personnelles");
	const [display, setDisplay] = useState("profile");
	const [loading, setLoading] = useState(true);
	//const { setShowBanner, setMessage, setType } = useContext(BannerContext);
	useEffect(() => {
		let user_id = localStorage.getItem("user_id");
		const payload = { id: user_id };
		axios.post("http://localhost:8000/api/user", payload)
            .then((response) => {
                setData(response.data.user);
				setLoading(false);
            })
            .catch(error => {
				console.log(error);
				setLoading(false);
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
	}

	const handleNavigate = (id) => {
		navigate(`/order/details`, { state: { id: id } });
	  };

	if (loading) {
		return <div>Loading...</div>;
	  }

	return (
		<>
			<div className='AccountTitle'>
				<h1>{ title.toUpperCase() }</h1>
			</div>
			<div className="AccountArea">
				<div className="AccountMenuArea">
				<h3>Bienvenue, { data.firstname}</h3>
				<div className='AccountMenuButtonArea'>
					<a className={`AccountMenuButton ${display == "profile" ? "selected" : ""}`} onClick={() => handleClick("profile")}>PROFILE</a>
					<a className={`AccountMenuButton ${display == "address" ? "selected" : ""}`} onClick={() => handleClick("address")}>CARNET D'ADRESSES</a>
					<a className={`AccountMenuButton ${display == "order" ? "selected" : ""}`} onClick={() => handleClick("order")}>MES COMMANDES</a>
					<a className={`AccountMenuButton ${display == "password" ? "selected" : ""}`} onClick={() => handleClick("password")}>GÉRER LE MOT DE PASSE</a>
				</div>
					
				</div>
				
				<div className="AccountDataArea">
					{display == "profile" && 
					<>
						<div className='AccountPersonnalDataArea'>
							<a>{ data.firstname } { data.lastname }</a>
							<a>{ data.email }</a>
							<a>{ data.phone }</a>
						</div>
						<div className='AccountAddressDataArea'>
							<a>{data.default_address.address}</a>
							<a>
							{data.default_address.npa} {data.default_address.city}
							</a>
							<a>{data.default_address.country}</a>
						</div>
					</>
					}
					{display == "address" && 
						data.addresses.map((address, index) => (
							<div key={index} className='AccountAddressDataArea'>
							  <a>{address.address}</a>
							  <a>
								{address.npa} {address.city}
							  </a>
							  <a>{address.country}</a>
							</div>
						))}
					{display == "order" && 
						data.orders.map((order, index) => (
							<div key={index} className='AccountPersonnalDataArea'>
							  <a className='AccountDetailButton' style={{color: 'blue'}} onClick={() => handleNavigate(order.id)}>Afficher les détails</a>
							  <a className='AccountDetailText'>Date de création : {order.created_date}</a>
							  <a className='AccountDetailText'>Numéro de commande : {order.nb_order}</a>
							  <a className='AccountDetailPrice'>Prix total - CHF {order.total_price}</a>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default AccountData;

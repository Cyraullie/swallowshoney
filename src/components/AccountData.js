import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { BannerContext } from './BannerContext';

function AccountData() {
	const [data, setData] = useState([]);
	const [title, setTitle] = useState("données personnelles");
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);

	useEffect(() => {
		let user_id = localStorage.getItem("user_id");
		const payload = { id: user_id };
		axios.post("http://localhost:8000/api/user", payload)
            .then((response) => {
                setData(response.data.user);
            })
            .catch(error => {
            console.log(error);
            });
	}, [data]);

	return (
		<>
			<div className='AccountTitle'>
				<h1>{ title.toUpperCase() }</h1>
			</div>
			<div className="AccountArea">
				<div className="AccountMenuArea">
				<a>Bienvenue, { data.firstname}</a>
				<a>Profil</a>
				<a>Carnet d'adresse</a>
				<a>Mes commandes</a>
				<a>Service client</a>
				<a>Gérer le mot de passe</a>

					
				</div>
				
				<div className="AccountDataArea">
					
					caca
					
				</div>
			</div>
		</>
	);
}

export default AccountData;

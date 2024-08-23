import React, { useContext, useEffect, useState } from 'react';
import { BannerContext } from '../components/BannerContext';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL_DEV;
//import { BannerContext } from './BannerContext';
//TODO pouvoir changer l'addresse par defaut
function AccountData() {
	const navigate = useNavigate();
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);
	const [data, setData] = useState([]);
	const [title, setTitle] = useState("données personnelles");
	const [display, setDisplay] = useState("profile");
	const [loading, setLoading] = useState(true);
	const [oldPwd, setOldPwd] = useState("");
	const [pwd, setPwd] = useState("");
	const [confirmPwd, setConfirmPwd] = useState(""); 
	const [samePwd, setSamePwd] = useState(false);
	let user_id = localStorage.getItem("user_id");
    const [passwordErrors, setPasswordErrors] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
	//const { setShowBanner, setMessage, setType } = useContext(BannerContext);
	useEffect(() => {
		const payload = { id: user_id };
		axios.post(apiUrl + "user", payload)
            .then((response) => {
                setData(response.data.user);
				setLoading(false);
            })
            .catch(error => {
				console.log(error);
				setLoading(false);
            });
	}, []);

	useEffect(() => {
        if (pwd && confirmPwd) {
            setSamePwd(pwd === confirmPwd);
        }
    }, [pwd, confirmPwd]);

    useEffect(() => {
        if (pwd) {
            setPasswordErrors({
                length: pwd.length >= 8,
                uppercase: /[A-Z]/.test(pwd),
                lowercase: /[a-z]/.test(pwd),
                number: /[0-9]/.test(pwd),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
            });
        }
    }, [pwd]);

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

	const handleNavigateEdit = () => {
		navigate(`/account/edit`, { state: { id: user_id, edit: "personal" } })
	}

	const handleNavigateEditAddress = (id) => {
		navigate(`/account/edit`, { state: { id: id, edit: "address" } })
	}

	const updateOldPwd = (event) => {
		setOldPwd(event.target.value)
	}
	
	const updatePwd = (event) => {
		setPwd(event.target.value)
	}

	const updateConfirmPwd = (event) => {
		setConfirmPwd(event.target.value)
	}

	const handleClickPassword = () => {
		if ((passwordErrors.length && passwordErrors.uppercase && passwordErrors.lowercase && passwordErrors.number && passwordErrors.special) && samePwd)
		{
			const payload = { user_id, oldPwd, pwd };
			console.log(payload)
			axios.post(apiUrl + "changeandcheck_password", payload)
			.then((response) => {
				setShowBanner(true);
				setMessage("Votre mot de passe a bien été changé");
				setType("success");
				setTimeout(() => {
					setShowBanner(false);
				}, 3000);
				setTitle("données personnelles");
				setDisplay("profile");
				setPwd("")
				setConfirmPwd("s")
				setOldPwd("")
			})
			.catch(error => {				
				setShowBanner(true);
				setMessage(error.response.data.message);
				setType("error");
				setTimeout(() => {
					setShowBanner(false);
				}, 3000);
			});
		}
	}

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
					<a className={`AccountMenuButton ${display == "profile" ? "selected" : ""}`} onClick={() => handleClick("profile")}>PROFIL</a>
					<a className={`AccountMenuButton ${display == "address" ? "selected" : ""}`} onClick={() => handleClick("address")}>CARNET D'ADRESSES</a>
					<a className={`AccountMenuButton ${display == "order" ? "selected" : ""}`} onClick={() => handleClick("order")}>MES COMMANDES</a>
					<a className={`AccountMenuButton ${display == "password" ? "selected" : ""}`} onClick={() => handleClick("password")}>GÉRER LE MOT DE PASSE</a>
				</div>
					
				</div>
				
				<div className="AccountDataArea">
					{display == "profile" && 
					<>
						<div style={{position: "relative"}} className='AccountPersonnalDataArea'>
							<a style={{position: "absolute", right: 10, top: 10 }} onClick={handleNavigateEdit}><img className='icon' src='assets/edit.png' /></a>
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
							<div style={{position: "relative"}} key={index} className='AccountAddressDataArea'>
							  <a style={{position: "absolute", right: 10, top: 10 }} onClick={() => handleNavigateEditAddress(address.id)}><img className='icon' src='assets/edit.png' /></a>
							  <a>{address.default ? "défaut" : ""}</a>
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
					{display == "password" && 
						<div className='AccountPersonnalDataArea'>
							<input className='LoginInput' type='password' placeholder='Ancien mot de passe' onChange={(event) => updateOldPwd(event)} />
							<Link className='ForgotPwd' to="ForgotPwd">Mot de passe oublié ?</Link>
							<input className='LoginInput' type='password' placeholder='Nouveau mot de passe' onChange={(event) => updatePwd(event)} />
							<input className='LoginInput' type='password' placeholder='Confimer le nouveau mot de passe' onChange={(event) => updateConfirmPwd(event)} />
							<div className='RegisterPwdRule'>
								{!samePwd && <p style={{ color: 'red' }}>Les mots de passe ne sont pas identiques</p>}
								{pwd && (
									<div>
										{!passwordErrors.length && <p style={{ color: 'red' }}>Le mot de passe doit contenir au moins 8 caractères.</p>}
										{!passwordErrors.uppercase && <p style={{ color: 'red' }}>Le mot de passe doit contenir une lettre majuscule.</p>}
										{!passwordErrors.lowercase && <p style={{ color: 'red' }}>Le mot de passe doit contenir une lettre minuscule.</p>}
										{!passwordErrors.number && <p style={{ color: 'red' }}>Le mot de passe doit contenir un chiffre.</p>}
										{!passwordErrors.special && <p style={{ color: 'red' }}>Le mot de passe doit contenir un caractère spécial.</p>}
									</div>
								)}
							</div>
							<a onClick={handleClickPassword} className='LoginButton'>Modifier le mot de passe</a>
						</div>
					}
				</div>
			</div>
		</>
	);
}

export default AccountData;

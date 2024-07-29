import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ close, login }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = () => {
		const payload = { email: email, password: password };
		axios.post("http://localhost:8000/api/login", payload)
		.then((response) => {
			localStorage.setItem("user_id", response.data.user.id);
			login();
			close();
		})
		.catch(error => {
			console.log(error);
		}); 
	}

	const updateEmail = (event) => {
		setEmail(event.target.value)
	}

	const updatePwd = (event) => {
		setPassword(event.target.value)
	}
	
	return (
	<>
		<div className="HideArea"/>
		<div className="LoginArea">
			<div className="LoginTitle">
				<a className='Login'>Se connecter</a>
				<Link onClick={close} login={login} className="Register" to="register">S'incrire</Link>
				<a className='CloseButton' onClick={close}>X</a>
			</div>
            <div className='LoginData'>
				<input 
                	onChange={(event) => updateEmail(event)} 
					className='LoginInput' type='email' placeholder='Adresse e-mail'/>
				<input
                	onChange={(event) => updatePwd(event)} 
					className='LoginInput' type='password' placeholder='Mot de passe'/>
				<Link onClick={close}  className='ForgotPwd' to="ForgotPwd">Mot de passe oublié ?</Link>
				<a onClick={handleClick} className='LoginButton'>Se connecter</a>
			</div>
			
		</div>
	</>
	);
};

export default Login;

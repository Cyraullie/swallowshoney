import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";

const Login = ({ close }) => {

	const handleClick = () => {
		console.log("login");
	}

	return (
	<>
		<div className="LoginArea">
			<div className="LoginTitle">
				<a className='Login'>Se connecter</a>
				<Link onClick={close} className="Register" to="register">S'incrire</Link>
				<a className='CloseButton' onClick={close}>X</a>
			</div>
            <div className='LoginData'>
				<input className='LoginInput' type='email' placeholder='Adresse e-mail'/>
				<input className='LoginInput' type='password' placeholder='Mot de passe'/>
				<Link className='ForgotPwd'>Mot de passe oublié ?</Link>
				<a onClick={handleClick} className='LoginButton'>Se connecter</a>
			</div>
			
		</div>
	</>
	);
};

export default Login;

import React, { useState, useEffect, useContext } from 'react';
import { BannerContext } from '../components/BannerContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL_DEV;

const Recover = () => {
	const navigate = useNavigate();
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);
    const [emailSend, setEmailSend] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [getCode, setGetCode] = useState('');
    const [code, setCode] = useState('');
    const [user_id, setUser_id] = useState(0);
    const [checkCode, setCheckCode] = useState(false);
    const [samePwd, setSamePwd] = useState(true);
    const [passwordErrors, setPasswordErrors] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeCode = (event) => {
        setCode(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleChangeCheckPassword= (event) => {
        setCheckPassword(event.target.value)
    }

    const handleClick = () => {
		const payload = { email: email };
		axios.post(apiUrl + "recover", payload)
		.then((response) => {
			setGetCode(response.data.code);
            setShowBanner(true);
            setMessage("Le mail a bien été envoyé !");
            setType("success");
            setTimeout(() => {
                setShowBanner(false);
            }, 3000);
            setEmailSend(true)
        })
		.catch(error => {
			console.log(error);
		}); 
	}

    const handleClickCheck = () => {
        const payload = { code, getCode, email};
        axios.post(apiUrl + "check_code", payload)
        .then((response) => {
            setUser_id(response.data.user_id)
            setCheckCode(true);
        })
        .catch(error => {
            console.log(error);
        }); 
    }

    useEffect(() => {
        if (password && checkPassword) {
            setSamePwd(password === checkPassword);
        }
    }, [password, checkPassword]);

    useEffect(() => {
        if (password) {
            setPasswordErrors({
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            });
        }
    }, [password]);

    const handleClickPassword = () => {
        if (samePwd && (passwordErrors.length && passwordErrors.uppercase && passwordErrors.lowercase && passwordErrors.number && passwordErrors.special))
        {
            const payload = { password, user_id };
            axios.post(apiUrl + "change_password", payload)
            .then((response) => {
                navigate("/")
            })
            .catch(error => {
                console.log(error);
            }); 
        }
        else{
            setShowBanner(true);
            setMessage("Les mots de passe ne respectent pas les régles !");
            setType("error");
            setTimeout(() => {
                setShowBanner(false);
            }, 3000);
            setEmailSend(true)
        }
    }

    return (
        <div className="body">
            <h1>Mot de passe oublié</h1>
            <div className='RecoverArea'>
                { !emailSend && !checkCode &&
                    <>
                        <input type='email' name='email' style={{ borderColor: email == "" ? 'red' : 'black' }} className='LoginInput' value={email} placeholder='Adresse e-mail' onChange={handleChange} />
                        <a onClick={handleClick} className='LoginButton'>Envoyer</a>
                    </>
                }
                { emailSend && !checkCode &&
                    <>
                        <input type='text' name='code' className='LoginInput' placeholder='Code reçu par mail' onChange={handleChangeCode} />
                        <a onClick={handleClickCheck} className='LoginButton'>Envoyer</a>
                    </>
                }
                { checkCode &&
                    <>
                        <input type='password' name='password' className='LoginInput' placeholder='Mot de passe' onChange={handleChangePassword} />
                        <input type='password' name='checkPassword' className='LoginInput' placeholder='Répéter le mot de passe' onChange={handleChangeCheckPassword} />
                        <div className='RegisterPwdRule'>
                            {!samePwd && <p style={{ color: 'red' }}>Les mots de passe ne sont pas identiques</p>}
                            {password && (
                                <div>
                                    {!passwordErrors.length && <p style={{ color: 'red' }}>Le mot de passe doit contenir au moins 8 caractères.</p>}
                                    {!passwordErrors.uppercase && <p style={{ color: 'red' }}>Le mot de passe doit contenir une lettre majuscule.</p>}
                                    {!passwordErrors.lowercase && <p style={{ color: 'red' }}>Le mot de passe doit contenir une lettre minuscule.</p>}
                                    {!passwordErrors.number && <p style={{ color: 'red' }}>Le mot de passe doit contenir un chiffre.</p>}
                                    {!passwordErrors.special && <p style={{ color: 'red' }}>Le mot de passe doit contenir un caractère spécial.</p>}
                                </div>
                            )}
                        </div>
                        <a onClick={handleClickPassword} className='LoginButton'>Modifier</a>
                    </>
                }
            </div>
        </div>
      )
    };
    
    export default Recover;
    
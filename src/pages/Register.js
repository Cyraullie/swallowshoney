import React, { useState, useEffect, useContext } from 'react';
import { BannerContext } from '../components/BannerContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL_DEV;
//TODO avoir une adresse par defaut au non
const Register = ({ login }) => {
	const navigate = useNavigate();
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);
    const [gender, setSelectedGender] = useState('');
    const [typeClient, setTypeClient] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [npa, setNpa] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [samePwd, setSamePwd] = useState(true);
    const [passwordErrors, setPasswordErrors] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
	const [formErrors, setFormErrors] = useState({
        gender: false,
        firstname: false,
        lastname: false,
        email: false,
        phone: false,
        city: false,
        address: false,
        npa: false,
        country: false,
        typeClient: false,
        password: false,
        confirmPassword: false
    });

    useEffect(() => {
        if (password && confirmPassword) {
            setSamePwd(password === confirmPassword);
        }
    }, [password, confirmPassword]);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'gender':
                setSelectedGender(value);
                break;
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'npa':
                setNpa(value);
                break;
            case 'country':
                setCountry(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'type':
                setTypeClient(value);
                break;
            default:
                break;
        }
    };

    const handleClick = () => {
		const newFormErrors = {
            gender: !gender,
            firstname: !firstname,
            lastname: !lastname,
            email: !email,
            phone: !phone,
            city: !city,
            address: !address,
            npa: !npa,
            country: !country,
            typeClient: !typeClient,
            password: !password,
            confirmPassword: !confirmPassword
        };
		newFormErrors.password = !passwordErrors.length || !passwordErrors.uppercase || !passwordErrors.lowercase || !passwordErrors.number || !passwordErrors.special;
        newFormErrors.confirmPassword = !samePwd;

		setFormErrors(newFormErrors);

		if (Object.values(newFormErrors).includes(true)) {
			setShowBanner(true);
			setMessage("Veuillez remplir tous les champs requis correctement !");
			setType("error");
			setTimeout(() => {
				setShowBanner(false);
			  }, 3000);
            return;
        }

        const payload = { gender, firstname, lastname, email, password, city, npa: npa, address, country, phone, typeClient };
        axios.post(apiUrl + "register", payload)
            .then(response => {
				localStorage.setItem("user_id", response.data.user.id);
				login(response.data.user.id);
				navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return  (
        <div className="body">
        	<div className="RegisterArea">
				<h1>Formulaire d'inscription</h1>
				<div className='RegisterPersonal'>
					<select name="gender" value={gender} style={{ borderColor: formErrors.gender ? 'red' : 'black' }} className='LoginInput' onChange={handleChange}>
						<option value="" disabled>Genre</option>
						<option value="male">Homme</option>
						<option value="female">Femme</option>
						<option value="non-binary">Non-binaire</option>
						<option value="prefer-not-to-say">Préférer ne pas dire</option>
						<option value="other">Autre</option>
					</select>
                    <select name="type" value={typeClient} style={{ borderColor: formErrors.gender ? 'red' : 'black' }} className='LoginInput' onChange={handleChange}>
						<option value="" disabled>type de client</option>
						<option value="1">personne</option>
						<option value="2">entreprise</option>
					</select>
					<input type='text' name='firstname' style={{ borderColor: formErrors.firstname ? 'red' : 'black' }} className='LoginInput' value={firstname} placeholder='Prénom' onChange={handleChange} />
					<input type='text' name='lastname' style={{ borderColor: formErrors.lastname ? 'red' : 'black' }} className='LoginInput' value={lastname} placeholder='Nom' onChange={handleChange} />
					<input type='email' name='email' style={{ borderColor: formErrors.email ? 'red' : 'black' }} className='LoginInput' value={email} placeholder='Adresse e-mail' onChange={handleChange} />
					<input type='tel' name='phone' style={{ borderColor: formErrors.phone ? 'red' : 'black' }} className='LoginInput' value={phone} placeholder='Numéro de téléphone' onChange={handleChange} />
				</div>
				<div className='RegisterPassword'>
					<input type='password' style={{ borderColor: formErrors.password ? 'red' : 'black' }} name='password' className='LoginInput' value={password} onChange={handleChange} placeholder='Mot de passe'/>
					<input type='password' style={{ borderColor: formErrors.confirmPassword ? 'red' : 'black' }} name='confirmPassword' className='LoginInput' value={confirmPassword} onChange={handleChange} placeholder='Répéter le mot de passe'/>
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
				</div>
				<div className='RegisterAddress'>
					<input type='text' name='address' style={{ borderColor: formErrors.address ? 'red' : 'black' }} className='LoginInput' value={address} placeholder='Adresse' onChange={handleChange} />
					<input type='text' name='npa' className='LoginInput' style={{ borderColor: formErrors.npa ? 'red' : 'black' }} value={npa} placeholder='NPA' onChange={handleChange} />
					<input type='text' name='city' style={{ borderColor: formErrors.city ? 'red' : 'black' }} className='LoginInput' value={city} placeholder='Ville' onChange={handleChange} />
					<select name='country' style={{ borderColor: formErrors.country ? 'red' : 'black' }} value={country} className='LoginInput' onChange={handleChange}>
						<option value="" disabled>Pays</option>
						<option value="Suisse">Suisse</option>
						<option value="France">France</option>
					</select>
				</div>
				<a onClick={handleClick} className='RegisterButton'>S'inscrire</a>
			</div>
		</div>
	);
};

export default Register;

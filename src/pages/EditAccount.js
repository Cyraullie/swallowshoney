//import AccountData from "../components/AccountData";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { BannerContext } from '../components/BannerContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL_DEV;

const EditAccount = () => {
	const navigate = useNavigate();
    const location = useLocation();
    const { id, edit } = location.state || {};
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [npa, setNpa] = useState('');
    const [address, setAddress] = useState('');
    const [formErrors, setFormErrors] = useState({
        firstname: false,
        lastname: false,
        email: false,
        phone: false,
        city: false,
        address: false,
        npa: false,
        country: false,
    });

    useEffect(() => {
        if (edit == "personal"){
            let user_id = localStorage.getItem("user_id");
            if (user_id == id) {
                const payload = { id: id };
                axios.post(apiUrl + "user", payload)
                .then((response) => {
                    setData(response.data.user);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
            }
        }
        else if (edit == "address")
        {
            let user_id = localStorage.getItem("user_id");
            const payload = { user_id: user_id, address_id: id };
            axios.post(apiUrl + "address", payload)
            .then((response) => {
                setData(response.data.address);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
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
            default:
                break;
        }
    };

    const handleClickPersonal = () => {
        const payload = { user_id: id, firstname, lastname, email, phone };
        console.log(payload)
        axios.post(apiUrl + "update_user", payload)
			.then((response) => {
				setShowBanner(true);
				setMessage("Votre profile a bien été mis à jour");
				setType("success");
				setTimeout(() => {
					setShowBanner(false);
				}, 3000);
                navigate("/account")
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

    const handleClickAddress = () => {
        const payload = { address_id: id, address, npa, city, country };
        console.log(payload)
        axios.post(apiUrl + "update_address", payload)
			.then((response) => {
				setShowBanner(true);
				setMessage("Votre adresse a bien été mis à jour");
				setType("success");
				setTimeout(() => {
					setShowBanner(false);
				}, 3000);
                navigate("/account")
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

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Une erreur c'est produite ...</div>;
    }

    return (
        <div className="body">
        <h2>{edit == "personal" ? "MODIFICATION DES DONNÉES PERSONNELS" : "MODIFICATION DE L'ADRESSE"}</h2>
        <div>
            {edit == "personal" &&
                <div className='RegisterPersonal'>
                    <input type='text' name='firstname' style={{ borderColor: formErrors.firstname ? 'red' : 'black' }} className='LoginInput' value={firstname == "" ? data.firstname : firstname} placeholder='Prénom' onChange={handleChange} />
					<input type='text' name='lastname' style={{ borderColor: formErrors.lastname ? 'red' : 'black' }} className='LoginInput' value={lastname == "" ? data.lastname : lastname} placeholder='Nom' onChange={handleChange} />
					<input type='email' name='email' style={{ borderColor: formErrors.email ? 'red' : 'black' }} className='LoginInput' value={email == "" ? data.email : email} placeholder='Adresse e-mail' onChange={handleChange} />
					<input type='tel' name='phone' style={{ borderColor: formErrors.phone ? 'red' : 'black' }} className='LoginInput' value={phone == "" ? data.phone : phone} placeholder='Numéro de téléphone' onChange={handleChange} />
					<a onClick={handleClickPersonal} className='LoginButton'>Mettre à jour</a>
                </div>
            }
            {edit == "address" &&
                <div className='RegisterAddress'>
                <input type='text' name='address' style={{ borderColor: formErrors.address ? 'red' : 'black' }} className='LoginInput' value={address == "" ? data.address : address} placeholder='Adresse' onChange={handleChange} />
                <input type='text' name='npa' className='LoginInput' style={{ borderColor: formErrors.npa ? 'red' : 'black' }} value={npa == "" ? data.npa : npa} placeholder='NPA' onChange={handleChange} />
                <input type='text' name='city' style={{ borderColor: formErrors.city ? 'red' : 'black' }} className='LoginInput' value={city == "" ? data.city : city} placeholder='Ville' onChange={handleChange} />
                <select name='country' style={{ borderColor: formErrors.country ? 'red' : 'black' }} value={country == "" ? data.country : country} className='LoginInput' onChange={handleChange}>
                    <option value="" disabled>Pays</option>
                    <option value="Suisse">Suisse</option>
                    <option value="France">France</option>
                </select>
                <a onClick={handleClickAddress} className='LoginButton'>Mettre à jour</a>
            </div>
            }
        </div>
    </div>
    );
  };
  
  export default EditAccount;
  
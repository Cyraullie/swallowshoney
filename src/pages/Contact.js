import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BannerContext } from '../components/BannerContext';

const Contact = () => {
	const navigate = useNavigate();
	const { setShowBanner, setMessage, setType } = useContext(BannerContext);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    subject: false,
    text: false,
  });

  useEffect(() => {
	  let user_id = localStorage.getItem("user_id");
    if (user_id != null)
    {
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
    }
    else {
      setLoading(false);
    }
	}, []);

  const handleClick = () => {
    const newFormErrors = {
      firstname: !firstname,
      lastname: !lastname,
      email: !email,
      subject: !subject,
      text: !text,
    };

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
    else {
      const payload = { firstname, lastname, email, subject, message: text };
      console.log(payload)
      axios.post("http://localhost:8000/api/contact", payload)
      .then((response) => {
        setShowBanner(true);
        setMessage("Votre message a bien été envoyé");
        setType("success");
        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
        navigate("/")
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
        case 'subject':
            setSubject(value);
            break;
        case 'message':
            setText(value);
            break;
        default:
            break;
    }
};

	if (loading) {
		return <div>Loading...</div>;
  }

  return (
    <div className="body">
      <h1>Contact Me</h1>

      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto", width: "70%", justifyContent: "space-between" }}>
          <input name='firstname' className='LoginInput' style={{ width: "47%", borderColor: formErrors.firstname ? 'red' : 'black' }} type='text' placeholder='prénom' onChange={handleChange}/>
          <input name='lastname' className='LoginInput' style={{ width: "47%", borderColor: formErrors.lastname ? 'red' : 'black' }} type='text' placeholder='nom' onChange={handleChange}/>
        </div>
        <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto", width: "70%" }}>
          <input name='email' className='LoginInput' style={{ width: "47%", borderColor: formErrors.email ? 'red' : 'black' }} type='text' placeholder='email' onChange={handleChange}/>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "auto", width: "70%", justifyContent: "space-between" }}>
          <input name='subject' style={{ borderColor: formErrors.subject ? 'red' : 'black' }} className='LoginInput' type='text' placeholder='sujet' onChange={handleChange}/>
          <textarea name='message' className='LoginInput' style={{ height: "300px", borderColor: formErrors.text ? 'red' : 'black' }} placeholder='message' onChange={handleChange}/>
          <a onClick={handleClick} className='LoginButton'>Envoyer</a>
        </div>
      </div>
    </div>
    )
  };  
  export default Contact;
  
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL_DEV;
//TODO faire l'affichage des détails de al commande
const OrderDetails = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      let user_id = localStorage.getItem("user_id");
      axios.get(apiUrl + "order/" + id + "/" + user_id)
        .then((response) => {
          setData(response.data.order);
          console.log(response.data.order)
         setLoading(false);
         setError(false);
        })
        .catch(message => {
          console.log(message);
          setLoading(false);
          setError(true);
        });
    }, []);


    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Une erreur c'est produite ...</div>;
    }

    return (
      <div>
        <h2>DÉTAILS DE LA COMMANDE</h2>
        <div>
          <div>
            <div>
              <h3>INFORMATIONS DE COMMANDE</h3>
              <p>Numéro de commande : {data.nb_order}</p>
              <p>Commande effectuée : {data.created_date}</p>
              <p>Statut de la commande : {data.state}</p>
            </div>
            <div>
              <h3>ADRESSE D’EXPÉDITION</h3>
              <p>{data.user.firstname} {data.user.lastname}</p>
              <p>{data.address.address}</p>
              <p>{data.address.country} - {data.address.city}, {data.address.npa}</p>
            </div>
            <div>
              <h3>coordonnées</h3>
              <p>{data.user.email}</p>
              <p>{data.user.phone}</p>
            </div>
            <div>
              <h3>MODE DE PAIEMENT</h3>
              <a>TWINT</a>
            </div>
          </div>
          <div>
          <h3>Résumé de la commande</h3>
          <p>Total de la commande chf {data.total_price}</p>
            {data.products.map((product, index) => (
							<div key={index}>
                <img src={"/assets/"+ product.imgsrc}></img>
                <p>{product.name}</p>
                <p>QUANTITÉ : {product.pivot.quantity}</p>
                <p>CHF : {product.price * product.pivot.quantity}</p>
							</div>
						))}
          </div>
        </div>
    </div>
    );
  };
  
  export default OrderDetails;
  
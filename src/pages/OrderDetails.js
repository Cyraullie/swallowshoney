//import AccountData from "../components/AccountData";
import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
//TODO faire l'affichage des détails de al commande
const OrderDetails = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let user_id = localStorage.getItem("user_id");
      axios.post("http://localhost:8000/api/order/" + id)
        .then((response) => {
          setData(response.data.user);
         setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }, []);


    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="body">
        CUCU {id}
    </div>
    );
  };
  
  export default OrderDetails;
  
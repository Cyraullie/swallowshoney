//import AccountData from "../components/AccountData";
import { useLocation } from 'react-router-dom';

//TODO faire l'affichage des détails de al commande
const OrderDetails = () => {
    const location = useLocation();
    const { id } = location.state || {};
    return (
      <div className="body">
        CUCU {id}
    </div>
    );
  };
  
  export default OrderDetails;
  
//import AccountData from "../components/AccountData";
import { useLocation } from 'react-router-dom';

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
  
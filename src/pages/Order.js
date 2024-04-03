import OrderArcticles from "../components/OrderArcticles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();

  let basketContent = JSON.parse(localStorage.getItem('basketContent'));
  let priceArray = []
  for(let i = 0; i < basketContent.length; i++) {
    priceArray.push(basketContent[i].price * basketContent[i].quantity)
  }
  let totalPrice = 0;

  for(let i = 0; i < priceArray.length; i++) {
    totalPrice += priceArray[i]
  }

  function orderClick() {
    console.log("bite")
/*
    let {name, link} = this.state;
    let payload = {name, link, level_id: this.props.route.params.params.id_level};

    const onSuccess = () => {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Elements',
        params: {
          id_level: this.props.route.params.params.id_level,
          id_groupElement: this.props.route.params.params.id_groupElement,
          name_level: this.props.route.params.params.name_level,
          name_groupElement: this.props.route.params.params.name_groupElement,
        } }],
      })
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      
    };
    axios.post(BASE_URL + "newElement", payload ).then(onSuccess).catch(onFailure)
    axios.get("http://localhost:8000/api/products")
            .then((response) => {
                
                this.getProductData(response.data) 

            })
            .catch(error => {
            console.log(error);
            });
            */
            navigate('/')
  }

    return (
      <div className="body">

        <div className="OrderArea">
            <div className="OrderTitle">
                <a>Commande</a>
            </div>
            <OrderArcticles orderContent={basketContent}/>

                    
            <div className="OrderTotalPrice">
                <a>Sous-Total : {totalPrice} CHF</a>
            </div>
            
            <div className="OrderDetail">
              <p>La commande ne sera validée que à partir du moment où le paiement est reçu.</p>
              <p>Pour ce faire vous pouvez payer par TWINT au <b>076 324 71 91</b>.</p>
            </div>
    
            <a className="OrderBuyButton" onClick={orderClick}>Valider la commande</a>
        </div>
    </div>
    );
  };
  
  export default Order;
  
import axios from "axios";
import Card from "../components/Card"


axios.get("http://localhost:8000/api/products")
    .then((response) => {
        getProductData(response.data) 
    })
    .catch(error => {
    console.log(error);
    });

    let productData = [];    


const getProductData = (data) => {
    for(let i = 0; i < data.length; i++) {
        productData.push(
            <>
                <Card title={data[i].name} imgsrc="HYDROMEL-MOELLEUX-NATURE.jpg"/>
            </>
        )
        console.log(data[i].name)
    }

    }

const ListProduct = () => {



    return (
      <div className="body">
        <div className="CardContainer">
            {productData}

        </div>
      </div>
      )
    };  
export default ListProduct;
  
    


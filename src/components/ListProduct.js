import React, { Component} from 'react';
import axios from "axios";
import Card from "../components/Card"


export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        
        this.state = { productDataState: [] }
      }

    getData = () => {
            axios.get("http://localhost:8000/api/products")
            .then((response) => {
                
                this.getProductData(response.data) 

            })
            .catch(error => {
            console.log(error);
            });
      }
    

    getProductData(data){
        let productData = []; 
        for(let i = 0; i < data.length; i++) {
            productData.push(
                <>
                    <Card title={data[i].name} imgsrc={data[i].imgsrc} discount={data[i].discount} description={data[i].description} productId={data[i].id} price={data[i].price} quantity={data[i].actual_quantity}/>
                </>
            )
        }

        this.setState({
            productDataState: productData,
        })
    
    }
           
    componentDidMount() {
        this.getData()
      }
    
    render() {
        return (
            <div className="CardContainer">
                {this.state.productDataState}
            </div>
        )
    }
          
}

   


import axios from "axios";

axios.get("http://localhost:8000/api/products")
    .then((response) => {
        //console.log(response.data)
        ListProduct(response.data) 
    })
    .catch(error => {
    console.log(error);
    });


const ListProduct = (data) => {

    console.log(data)
    //console.log("data")


    return (
      <div className="body">
        <h1>Contact Me</h1>;
      </div>
      )
    };  
export default ListProduct;
  
    


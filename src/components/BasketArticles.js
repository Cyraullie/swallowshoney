import React, { Component} from 'react';
  

export default class BasketArticles extends Component {
  constructor(props) {
    super(props);
    
    this.state = { productDataState: [] }
  }

    getData = () => {
      const basketContent = JSON.parse(localStorage.getItem('basketContent'));
          
      this.getBasketData(basketContent) 

  }

  getBasketData(data){
    //<input className='BasketQuantity' type="number" min={1} defaultValue={data[i].quantity}></input>
    let basketData = []; 
    for(let i = 0; i < data.length; i++) {
      basketData.push(
            <>
                <div className='BasketArticle'>
                  <a>{data[i].name}</a>
                  <a>{data[i].quantity} pcs</a>
                </div>
            </>
        )
    }

    this.setState({
        basketDataState: basketData,
    })

  }
      
  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div className="BasketArticles">
        {this.state.basketDataState}
      </div>
    )
  }


  
}

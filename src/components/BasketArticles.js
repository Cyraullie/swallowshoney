import React, { useState, useEffect } from 'react';
  

const BasketArticles = ({ basketContent }) => {
  
  console.log(basketContent)
  const [basketDataState, setBasketDataState] = useState([]);

    useEffect(() => {
    // Définissez la nouvelle valeur de basketData en fonction de basketContent
    let basketData = basketContent.map(item => (
      <div className='BasketArticle' key={item.id}>
        <a>{item.name}</a>
        <a>{item.quantity} pcs</a>
      </div>
    ));
    // Mettez à jour l'état basketDataState
    setBasketDataState(basketData);
  }, [basketContent]);


  return (
    <>
    <div className="BasketArticles">
      {basketDataState}
    </div>
    </>
  )
  


  
}

export default BasketArticles;
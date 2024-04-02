import React, { useState, useEffect } from 'react';
  

const OrderArticles = ({ orderContent }) => {
  const [orderDataState, setOrderDataState] = useState([]);

    useEffect(() => {
    // Définissez la nouvelle valeur de basketData en fonction de basketContent
    let orderData = orderContent.map(item => (
      <div className='OrderArticle' key={item.id}>
        <a className='NameArticle'>{item.name}</a>
        <a>{item.quantity} pcs</a>
        <a>{item.price} .-/pcs</a>
        <a>{(item.quantity * item.price)} .-</a>
      </div>
    ));
    // Mettez à jour l'état basketDataState
    setOrderDataState(orderData);
  }, [orderContent]);


  return (
    <>
    <div className="OrderArticles">
      {orderDataState}
    </div>
    </>
  )
  


  
}

export default OrderArticles;


function Card(data) {
    return (
      <div className="CardArea">
          <div className="CardImage"><img src={"/assets/"+ data.imgsrc}></img></div>
          <div className="CardName"><a className="CardTitle">{data.title}</a></div>
          <div className="CardButtons">
            <div className="CardDetailsButton">Détails</div>
            <div className="CardBuyButton">Acheter</div>
          </div>
          
      </div>
    );
  }
  
  export default Card;
  
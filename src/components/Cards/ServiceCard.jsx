import "./ServiceCard.css";

function ServiceCard(props) {

  return (

    <div className="service-card">

      <h2>{props.title}</h2>

      <p>{props.description}</p>

      <button onClick={props.onClick}>
        {props.button}
      </button>

    </div>

  );
}

export default ServiceCard;
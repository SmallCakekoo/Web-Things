import './Card.css';

export const Card = ({ title, price, description, img }) => {
    
    return (
        <div className="card">
            <h1>{title}</h1>
            <h3>{price}</h3>
            <p>{description}</p>
            <img src={img} alt={title} className="card-img" />
        </div>
    );
};

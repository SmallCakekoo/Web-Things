export const CharacterCard = ({ image, name, species, status }) => {
    return (
        <div className="card">
            <div className="card-image-wrap">
                <img src={image} alt={name} loading="lazy" />
            </div>
            <div className="card-content">
                <span className="card-tag">{species}</span>
                <h3 className="card-title">{name}</h3>
                <div className="status-indicator">
                    <span className={`dot ${status.toLowerCase()}`}></span>
                    <span>{status}</span>
                </div>
            </div>
        </div>
    );
};

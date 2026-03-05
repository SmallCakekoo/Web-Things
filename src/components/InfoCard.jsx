import React from 'react';

/**
 * Reusable InfoCard component
 * @param {Object} props
 * @param {Object} props.card - The card data
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 */
export const InfoCard = ({ card, onEdit, onDelete }) => {
    return (
        <div className="info-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>

            <div className="card-actions">
                <button
                    className="btn btn-edit"
                    onClick={() => onEdit(card)}
                >
                    Editar
                </button>
                <button
                    className="btn btn-delete"
                    onClick={() => onDelete(card.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

"use client";

import React, { useState } from 'react';
import { addPromotion } from '../movieService'; // Adjust the path if necessary
import './page.css';

export default function ManagePromotions() {
    const [promotions, setPromotions] = useState([]);
    const [newPromotion, setNewPromotion] = useState({ title: '', discount: '', validUntil: '' });
    const [error, setError] = useState('');

    // Function to add a new promotion to the list and notify users
    const handleAddPromotion = async () => {
        if (!newPromotion.title || !newPromotion.discount || !newPromotion.validUntil) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Call the addPromotion function to send data to the backend
            const addedPromotion = await addPromotion(newPromotion);

            // Add the new promotion to the local state
            const updatedPromotions = [
                ...promotions,
                { id: addedPromotion.id, ...newPromotion }, // Assuming the backend returns the new promotion with an id
            ];
            setPromotions(updatedPromotions);
            setNewPromotion({ title: '', discount: '', validUntil: '' }); // Reset input fields
        } catch (error) {
            console.error("Error adding promotion:", error);
            setError("Failed to add promotion. Please try again.");
        }
    };

    // Function to delete a promotion from the list
    const handleDeletePromotion = (id) => {
        const updatedPromotions = promotions.filter(promotion => promotion.id !== id);
        setPromotions(updatedPromotions);
    };

    return (
        <div className="promotions-container">
            <h2 className="promotions-title">Manage Promotions</h2>

            {error && <p className="error-message">{error}</p>} {/* Display error message */}

            <div className="add-promotion-section">
                <h3 className="section-subtitle">Add New Promotion</h3>
                <input
                    type="text"
                    placeholder="Promotion Title"
                    value={newPromotion.title}
                    onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Discount (e.g., 20%)"
                    value={newPromotion.discount}
                    onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                    className="input-field"
                />
                <input
                    type="date"
                    value={newPromotion.validUntil}
                    onChange={(e) => setNewPromotion({ ...newPromotion, validUntil: e.target.value })}
                    className="input-field"
                />
                <button
                    onClick={handleAddPromotion}
                    className="add-button"
                >
                    Add Promotion
                </button>
            </div>

            <ul className="promotions-list">
                {promotions.map((promotion) => (
                    <li key={promotion.id} className="promotion-item">
                        <div>
                            <p className="promotion-title">{promotion.title}</p>
                            <p className="promotion-details">Discount: {promotion.discount}</p>
                            <p className="promotion-details">Valid Until: {promotion.validUntil}</p>
                        </div>
                        <button
                            onClick={() => handleDeletePromotion(promotion.id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


"use client";

import React, { useState } from 'react';

export default function ManagePromotions() {
    const [promotions, setPromotions] = useState([
        { id: 1, title: 'Special Sale', discount: '20%', validUntil: '12-10-2024' },
        { id: 2, title: 'Weekend Special', discount: '15%', validUntil: '12-28-2024' },
    ]);
    const [newPromotion, setNewPromotion] = useState({ title: '', discount: '', validUntil: '' });

    const handleAddPromotion = () => {
        if (!newPromotion.title || !newPromotion.discount || !newPromotion.validUntil) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedPromotions = [
            ...promotions,
            { id: promotions.length + 1, ...newPromotion },
        ];
        setPromotions(updatedPromotions);
        setNewPromotion({ title: '', discount: '', validUntil: '' });
    };

    const handleDeletePromotion = (id) => {
        const updatedPromotions = promotions.filter(promotion => promotion.id !== id);
        setPromotions(updatedPromotions);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-black">Manage Promotions</h2>

            <div className="mb-4">
                <h3 className="font-semibold text-black">Add New Promotion</h3>
                <input
                    type="text"
                    placeholder="Promotion Title"
                    value={newPromotion.title}
                    onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                    className="border rounded w-full p-2 mb-2"
                />
                <input
                    type="text"
                    placeholder="Discount (e.g., 20%)"
                    value={newPromotion.discount}
                    onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                    className="border rounded w-full p-2 mb-2"
                />
                <input
                    type="date"
                    value={newPromotion.validUntil}
                    onChange={(e) => setNewPromotion({ ...newPromotion, validUntil: e.target.value })}
                    className="border rounded w-full p-2 mb-2"
                />
                <button
                    onClick={handleAddPromotion}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Promotion
                </button>
            </div>

            <ul className="divide-y divide-gray-300">
                {promotions.map((promotion) => (
                    <li key={promotion.id} className="py-2 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-black">{promotion.title}</p>
                            <p className="text-black">Discount: {promotion.discount}</p>
                            <p className="text-black">Valid Until: {promotion.validUntil}</p>
                        </div>
                        <button
                            onClick={() => handleDeletePromotion(promotion.id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


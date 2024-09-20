"use client";

import React from 'react';

export default function Checkout() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 text-black">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>

                {/* Billing Information */}
                <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border rounded"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">
                            Billing Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="billingAddress"
                            className="w-full p-2 border rounded"
                            placeholder="Billing Address"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="city"
                            className="w-full p-2 border rounded"
                            placeholder="City"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">
                            State <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="state"
                            className="w-full p-2 border rounded"
                            placeholder="State"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">
                            ZIP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="zip"
                            className="w-full p-2 border rounded"
                            placeholder="ZIP Code"
                            required
                        />
                    </div>
                </div>

                {/* Payment Information */}
                <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1">
                            Credit Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="creditCardNumber"
                            className="w-full p-2 border rounded"
                            placeholder="Card Number"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">
                            Expiration Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="expirationDate"
                            className="w-full p-2 border rounded"
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">
                            CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="cvv"
                            className="w-full p-2 border rounded"
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>

                {/* Confirm Purchase Button */}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                    Confirm and Complete Purchase
                </button>
            </div>
        </div>
    );
}



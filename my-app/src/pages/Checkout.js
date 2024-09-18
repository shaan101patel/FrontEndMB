// src/Checkout.js
import React, { useState } from 'react';


const Checkout = () => {
    // State to handle form data
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        creditCard: '',
        expiration: '',
        cvv: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Order placed successfully for ${formData.fullName}!`);
        // You can handle more logic here like sending form data to a backend server.
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>

            {/* Cart Summary */}
            <div className="cart-summary">
                <h3>Order Summary</h3>
                <p>Item 1: $20.00</p>
                <p>Item 2: $15.00</p>
                <p>Total: $35.00</p>
            </div>

            {/* Checkout Form */}
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h3>Shipping Information</h3>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h3>Payment Information</h3>
                <div>
                    <label>Credit Card Number:</label>
                    <input
                        type="text"
                        name="creditCard"
                        value={formData.creditCard}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Expiration Date:</label>
                    <input
                        type="text"
                        name="expiration"
                        value={formData.expiration}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;

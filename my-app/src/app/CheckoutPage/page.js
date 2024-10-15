// app/CheckoutPage/page.js

"use client";

import React from 'react';
import './page.css'; // Import the CSS file

export default function Checkout() {
    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h2 className="checkout-title">Checkout</h2>

                {/* Billing Information */}
                <h3 className="section-title">Billing Information</h3>
                <div className="grid-container">
                    <div className="form-group">
                        <label>
                            Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Billing Address <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="billingAddress"
                            placeholder="Billing Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            City <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            State <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            ZIP Code <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP Code"
                            required
                        />
                    </div>
                </div>

                {/* Payment Information */}
                <h3 className="section-title">Payment Information</h3>
                <div className="grid-container">
                    <div className="form-group">
                        <label>
                            Credit Card Number <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="creditCardNumber"
                            placeholder="Card Number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Expiration Date <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="expirationDate"
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            CVV <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>

                {/* Confirm Purchase Button */}
                <button className="checkout-button">
                    Confirm and Complete Purchase
                </button>
            </div>
        </div>
    );
}


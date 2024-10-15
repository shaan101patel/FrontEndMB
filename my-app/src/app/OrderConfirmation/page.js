// app/OrderConfirmation/page.js

import React from 'react';
import './page.css';

export default function OrderConfirmation() {
    return (
        <div className="order-confirmation-container">
            <div className="order-card">
                <h2 className="order-title">Order Confirmed!</h2>
                <p className="order-message">Thank you for your purchase. Your order has been successfully placed.</p>

                {/* Order Summary */}
                <div className="order-summary">
                    <h3 className="summary-title">Order Summary</h3>
                    <ul className="summary-list">
                        <li className="summary-item">
                            <span>Movie:</span> <span>Barbie</span>
                        </li>
                        <li className="summary-item">
                            <span>Showtime:</span> <span>6:00 PM</span>
                        </li>
                        <li className="summary-item">
                            <span>Seats:</span> <span>A-3, A-4</span>
                        </li>
                        <li className="summary-item">
                            <span>Total Price:</span> <span>$25.00</span>
                        </li>
                    </ul>
                    <div className="order-number">
                        <span>Order Number:</span> <span>#123456789</span>
                    </div>
                </div>

                {/* Confirmation Message */}
                <p className="confirmation-email">A confirmation email has been sent to your inbox.</p>

                {/* Back to Home Button */}
                <button className="home-button">
                    Back to Home
                </button>
            </div>
        </div>
    );
}

// app/confirmation/page.js

"use client";

import React from 'react';
import './page.css'; // Import the CSS file

const Confirmation = () => {
    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <h2 className="confirmation-title">Registration Successful!</h2>
                <p className="confirmation-text">
                    Thank you for registering! You can now log in and start booking a movie.
                </p>
                <div className="confirmation-button-container">
                    <a href="/login" className="confirmation-button">
                        Go to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;

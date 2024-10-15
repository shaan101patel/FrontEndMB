// app/terms/page.js

"use client";

import React from 'react';
import './page.css';

const TermsOfService = () => {
    return (
        <div className="terms-container">
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-text">
                Welcome to Cinema E-Booking. By accessing or using our website and services, you agree to be bound
                by these Terms of Service. Please read them carefully.
            </p>

            <h2 className="terms-subtitle">1. Use of Service</h2>
            <p className="terms-text">
                You agree to use our services only for lawful purposes and in a way that does not infringe the rights
                of others or restrict their use and enjoyment of the service.
            </p>

            <h2 className="terms-subtitle">2. Account Registration</h2>
            <p className="terms-text">
                To access certain features, you may need to create an account. You are responsible for maintaining the
                confidentiality of your account information and all activities that occur under your account.
            </p>

            <h2 className="terms-subtitle">3. Ticket Purchases</h2>
            <p className="terms-text">
                All ticket purchases are subject to availability and confirmation of the order price. We reserve the
                right to refuse any order placed by you.
            </p>

            <h2 className="terms-subtitle">4. Cancellation and Refunds</h2>
            <p className="terms-text">
                Tickets once purchased cannot be canceled, exchanged, or refunded except in certain circumstances as
                outlined in our refund policy.
            </p>

            <h2 className="terms-subtitle">5. Intellectual Property</h2>
            <p className="terms-text">
                All content on this website, including text, graphics, logos, and images, is the property of Cinema
                E-Booking or its content suppliers and is protected by international copyright laws.
            </p>

            <h2 className="terms-subtitle">6. Limitation of Liability</h2>
            <p className="terms-text">
                We shall not be liable for any indirect, incidental, or consequential damages arising out of or in
                connection with the use of our services.
            </p>

            <h2 className="terms-subtitle">7. Changes to Terms</h2>
            <p className="terms-text">
                We reserve the right to modify these Terms of Service at any time. Your continued use of the service
                constitutes acceptance of the updated terms.
            </p>

            <h2 className="terms-subtitle">8. Contact Us</h2>
            <p className="terms-text">
                If you have any questions about these Terms, please contact us at support@cinemaebooking.com.
            </p>
        </div>
    );
};

export default TermsOfService;

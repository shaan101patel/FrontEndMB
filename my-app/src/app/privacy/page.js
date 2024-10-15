// app/privacy/page.js

"use client";

import React from 'react';
import './page.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-container">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-text">
                At Cinema E-Booking, we are committed to protecting your privacy. This Privacy Policy outlines how
                we collect, use, and safeguard your personal information.
            </p>

            <h2 className="privacy-subtitle">1. Information We Collect</h2>
            <p className="privacy-text">
                We may collect personal information such as your name, email address, billing information, and
                transaction details when you use our services.
            </p>

            <h2 className="privacy-subtitle">2. How We Use Your Information</h2>
            <p className="privacy-text">
                Your information is used to process transactions, provide customer support, send updates, and improve
                our services.
            </p>

            <h2 className="privacy-subtitle">3. Cookies and Tracking</h2>
            <p className="privacy-text">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver
                personalized content.
            </p>

            <h2 className="privacy-subtitle">4. Data Security</h2>
            <p className="privacy-text">
                We implement industry-standard security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="privacy-subtitle">5. Third-Party Services</h2>
            <p className="privacy-text">
                We may share your information with trusted third-party service providers who assist us in operating
                our website and conducting our business.
            </p>

            <h2 className="privacy-subtitle">6. Your Rights</h2>
            <p className="privacy-text">
                You have the right to access, correct, or delete your personal information. To exercise these rights,
                please contact us.
            </p>

            <h2 className="privacy-subtitle">7. Changes to This Policy</h2>
            <p className="privacy-text">
                We may update this Privacy Policy from time to time. We encourage you to review it periodically for
                any changes.
            </p>

            <h2 className="privacy-subtitle">8. Contact Us</h2>
            <p className="privacy-text">
                For any questions regarding this Privacy Policy, please contact us at privacy@cinemaebooking.com.
            </p>
        </div>
    );
};

export default PrivacyPolicy;

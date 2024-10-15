// app/about/page.js

"use client";

import React from 'react';
import './page.css';

const AboutUs = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About Cinema E-Booking</h1>
            <p className="about-text">
                Welcome to Cinema E-Booking, your premier destination for online movie ticket bookings.
                Founded in 2024, we aim to revolutionize the way you experience cinema by bringing convenience
                and ease right to your fingertips.
            </p>
            <h2 className="about-subtitle">Our Mission</h2>
            <p className="about-text">
                Our mission is to provide a seamless and user-friendly platform where movie enthusiasts can
                explore, select, and book tickets for their favorite movies effortlessly. We are committed to
                enhancing your movie-going experience through innovative technology and exceptional customer service.
            </p>
            <h2 className="about-subtitle">Why Choose Us?</h2>
            <ul className="about-list">
                <li>Easy and secure online booking</li>
                <li>Exclusive promotions and discounts</li>
                <li>Real-time seat selection</li>
                <li>Comprehensive movie information</li>
                <li>24/7 customer support</li>
            </ul>
            <h2 className="about-subtitle">Join Our Community</h2>
            <p className="about-text">
                Become a part of our growing community and stay updated with the latest movie releases, promotions,
                and events. Follow us on social media and subscribe to our newsletter for exclusive offers.
            </p>
        </div>
    );
};

export default AboutUs;

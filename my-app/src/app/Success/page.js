/*
"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Use Next.js's navigation package
import { verifyEmail } from '../movieService'; // Adjust the import path as necessary
import './page.css';

const Success = () => {
    const searchParams = useSearchParams(); // Get search params to access query params
    const [message, setMessage] = useState('Verifying...'); // Initial message while loading

    useEffect(() => {
        // Parse the token from the URL query parameters
        const token = searchParams.get('token');

        const handleEmailVerification = async () => {
            // Check if token exists in the URL
            if (!token) {
                setMessage('No verification token provided.');
                return;
            }

            try {
                const response = await verifyEmail(token);
                console.log('Response:', response); // Log the response to check its structure
                setMessage(response.data.message); // Check if response.data exists and has a message
            } catch (error) {
                console.error('Error:', error); // Log the error object to check its structure
                const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
                setMessage('Error verifying email:1 ' + errorMessage);
            }

        };

        handleEmailVerification();
    }, [searchParams]); // Dependency array to re-run effect if search params change

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{message}</p>
        </div>
    );
};

export default Success;
*/

"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Use Next.js's navigation package
import { verifyEmail } from '../movieService'; // Adjust the import path as necessary
import './page.css';

const Success = () => {
    const searchParams = useSearchParams(); // Get search params to access query params
    const [message, setMessage] = useState('Verifying...'); // Initial message while loading

    useEffect(() => {
        const token = searchParams.get('token');

        const handleEmailVerification = async () => {
            if (!token) {
                setMessage('No verification token provided.');
                return;
            }

            try {
                const response = await verifyEmail(token);
                console.log('Response:', response);
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error:', error);
                const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
                setMessage('Error verifying email: ' + errorMessage);
            }
        };

        handleEmailVerification();
    }, [searchParams]);

    const handleReturnToLogin = () => {
        // Navigate to the login page (you can adjust the path as necessary)
        window.location.href = '/login';
    };

    return (
        <div>
            <div className="main-content">
                <div className="success-container">
                    <h2 className="success-heading">Success!</h2> {/* Added Success heading */}
                    <p className="success-message">User successfully verified and activated.</p>
                    <button className="return-button" onClick={handleReturnToLogin}>
                        Return to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;

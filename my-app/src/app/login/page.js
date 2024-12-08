
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importing router for navigation
import { loginUser } from '../movieService'; // Import the loginUser function
import Link from 'next/link';
import './page.css'; // Import the CSS file

import { fetchUserProfile } from "../movieService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberMe') === 'true' ? localStorage.getItem('email') : '';
        const savedPassword = localStorage.getItem('rememberMe') === 'true' ? localStorage.getItem('password') : '';
        const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

        setEmail(savedEmail || '');
        setPassword(savedPassword || '');
        setRememberMe(savedRememberMe);
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    };

    const handleLogin = async () => {

        try {
            const response = await loginUser(email, password);
            console.log(response);

            setEmail(response.email);
            console.log("Logged in email:", response.email);


            if (response.role) {
                localStorage.setItem('userEmail', response.email); // Check if the response has a role
                if (rememberMe) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password); // Store only if it's secure
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    // Clear stored credentials if "Remember Me" is not checked
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    localStorage.setItem('rememberMe', 'false');
                }

                localStorage.setItem("userRole", response.role); // Store role in localStorage

                window.dispatchEvent(new Event('login'));


                router.push(response.role === 'user' ? '/' : '/admin'); // Redirect based on role
            }
        } catch (err) {
            setError('Login Failed ');
        }
    };

    return (
        <div className="main-content">
            <div className="login-card">
                <h1 className="title">Login</h1>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Email"
                    className="input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Password"
                    className="input"
                />
                <label className="remember-me">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember Me
                </label>
                <button className="login-button" onClick={handleLogin}>Login</button>

                <Link className="link" href="/ForgotPassword">Forgot Password?</Link>

                <div className="signup-option">
                    <p><strong>Don't have an account?</strong> <Link href="/register" className="link">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

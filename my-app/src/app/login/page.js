/*"use client"; // This marks the file as a Client Component

console.log("Login component rendered");


import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing router for navigation
import { loginUser } from '../movieService'; // Import the loginUser function
import Link from 'next/link';

console.log("hi");

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    console.log("here");

    const handleSubmit = async (e) => {
        console.log("Login button clicked!");

        e.preventDefault();

        console.log("Login button clicked!");


        // Check if email or password is empty before making the API call
        if (!email || !password) {
            setError('Please fill out both fields.');
            return;
        }

        console.log('Attempting to login with:', { email, password }); // Debug log

        try {
            // Call the loginUser function from movieService.js
            const data = await loginUser(email, password);
            console.log("Form submitted and response received:", data); // Debug log

            // Assuming the backend returns a token and user role:
            localStorage.setItem('authToken', data.token); // Store the token

            // Check user role and redirect
            if (data.userStatus === 'admin') {
                router.push('/admin'); // Redirect to the admin page if the user is an admin
            } else {
                router.push('/'); // Redirect to the home page for regular users
            }

            // Clear the form after successful login
            setEmail('');
            setPassword('');
            setRememberMe(false);

        } catch (error) {
            console.error("Login failed:", error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-center text-xl font-bold mb-4 text-black">Login</h2>

                    {error && <p className="text-red-500 text-xs italic">{error}</p>}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Password?
                        </a>
                    </div>

                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-600"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="ml-2 text-gray-700 text-sm">Remember Me</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-500 hover:text-blue-800 font-bold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;*/

/*
"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing router for navigation
import { loginUser } from '../movieService'; // Import the loginUser function
import Link from 'next/link';
import './page.css'; // Import the CSS file


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin(); // Call your login function (or just redirect)
        }
    };

    const handleLogin = async () => {
        // Your login logic here
        try {
            //await loginUser(email, password); // Assuming this function logs in the user
            //router.push('/admin'); // Redirect to /admin on successful login

            const response = await loginUser(email, password); // Assuming this function logs in the user

            console.log(response); // Log the response to see its value

            // Check user status
            if (response.role === 'user') {
                router.push('/'); // Redirect to '/' if the role is user
            } else {
                router.push('/admin'); // Redirect to /admin on successful login if the role is not user
            }


        } catch (err) {
            console.log("HI");
            setError('Login Failed'); // Handle login error
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown} // Add key down event listener
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown} // Add key down event listener
                placeholder="Password"
            />
            <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
            </label>
            <button onClick={handleLogin}>Login</button>
            <Link href="/forgot-password">Forgot Password?</Link>
        </div>
    );
};

export default Login;
*/


/*"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing router for navigation
import { loginUser } from '../movieService'; // Import the loginUser function
import Link from 'next/link';
import './page.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);
            console.log(response); // Log the response to see its value

            if (response.role === 'user') {
                setIsLoggedIn(true);
                router.push('/'); // Redirect to '/' if the role is user
            } else {
                setIsLoggedIn(true);
                router.push('/admin'); // Redirect to /admin on successful login if the role is not user
            }

        } catch (err) {
            setError('Login Failed'); // Handle login error
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
                <Link className="link" href="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
};

export default Login;*/


//last shot
/*"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing router for navigation
import { loginUser } from '../movieService'; // Import the loginUser function
import Link from 'next/link';
import './page.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);
            console.log(response); // Log the response to see its value

            if (response.role) { // Check if the response has a role
                localStorage.setItem("userRole", response.role); // Store role in localStorage
                router.push(response.role === 'user' ? '/' : '/admin'); // Redirect based on role
            }
        } catch (err) {
            setError('Login Failed'); // Handle login error
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
                <button className="login-button" onClick={handleLogin}>Login</button>
                <Link className="link" href="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
};

export default Login;*/

/*
"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing router for navigation
import { loginUser } from '../movieService'; // Import the loginUser function
import Link from 'next/link';
import './page.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);
            console.log(response); // Log the response to see its value

            if (response.role) { // Check if the response has a role
                localStorage.setItem("userRole", response.role); // Store role in localStorage

                // Create and dispatch a custom event to signal that the user has logged in
                window.dispatchEvent(new Event('login'));

                router.push(response.role === 'user' ? '/' : '/admin'); // Redirect based on role
            }
        } catch (err) {
            setError('Login Failed'); // Handle login error
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
                <button className="login-button" onClick={handleLogin}>Login</button>
                <Link className="link" href="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
};

export default Login;
*/

"use client"; // This marks the file as a Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importing router for navigation
import { loginUser } from '../movieService'; // Import the loginUser function
import Link from 'next/link';
import './page.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
    const [error, setError] = useState('');
    const router = useRouter();

    // On component mount, check if credentials are stored
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
            console.log(response); // Log the response to see its value

            if (response.role) { // Check if the response has a role
                // If "Remember Me" is checked, store credentials
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

                // Create and dispatch a custom event to signal that the user has logged in
                window.dispatchEvent(new Event('login'));

                router.push(response.role === 'user' ? '/' : '/admin'); // Redirect based on role
            }
        } catch (err) {
            setError('Login Failed'); // Handle login error
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
                <Link className="link" href="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
};

export default Login;




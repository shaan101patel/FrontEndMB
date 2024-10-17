/*
"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation

const Login = () => {
  // State to manage form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to handle form submission and errors
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }

    // Clear error if any
    setError('');

    // Perform login logic (API call or local validation)
    console.log('Logging in with:', { email, password });

    // Reset form (optional)
    setEmail('');
    setPassword('');
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

export default Login;
*/

"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Login = () => {
  const router = useRouter(); // Initialize the router

  // State to manage form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to handle form submission and errors
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }

    // Clear error if any
    setError('');

    // Perform login logic (API call or local validation)
    console.log('Logging in with:', { email, password });

    // Simulate a successful login and redirect
    // Replace this with your actual authentication logic
    setTimeout(() => {
      // On successful login, navigate to the home page or dashboard
      router.push('/'); // Change '/' to the desired route after login
    }, 1000);

    // Reset form (optional)
    setEmail('');
    setPassword('');
  };

  return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-center text-xl font-bold mb-4 text-black">Login</h2>

            {error && <p className="text-red-500 text-xs italic">{error}</p>}

            {/* Email Input */}
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

            {/* Password Input */}
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
              <Link href="/ForgotPassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
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

export default Login;

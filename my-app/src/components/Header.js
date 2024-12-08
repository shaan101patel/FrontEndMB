
"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const updateLoginStatus = () => {
            if (typeof window !== "undefined") {
                const role = localStorage.getItem("userRole");
                setIsLoggedIn(!!role); // Update logged-in state based on role existence
                setUserRole(role); // Store the user's role
            }
        };

        // Check localStorage for user role to determine login status on mount
        updateLoginStatus();

        // Listen for the custom 'login' event
        window.addEventListener("login", updateLoginStatus);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("login", updateLoginStatus);
        };
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userRole"); // Clear user role
            setIsLoggedIn(false); // Update logged-in state
            setUserRole(null); // Clear the user's role
            router.push("/login"); // Redirect to login page
        }
    };

    return (
        <header className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    {/* Disable Cinema E-Booking link if user is an admin */}
                    {userRole === "admin" ? (
                        <span className="text-gray-400 text-2xl font-bold cursor-not-allowed">
                            Cinema E-Booking
                        </span>
                    ) : (
                        <Link href="/" className="text-white text-2xl font-bold">
                            Cinema E-Booking
                        </Link>
                    )}
                </div>

                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="text-white hover:text-gray-300">
                                Home
                            </Link>
                        </li>
                        {!isLoggedIn ? ( // If not logged in, show Login/Register
                            <>
                                <li>
                                    <Link href="/login" className="text-white hover:text-gray-300">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className="text-white hover:text-gray-300">
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : ( // If logged in, show additional buttons
                            <>
                                <li>
                                    <Link href="/profile" className="text-white hover:text-gray-300">
                                        Edit Profile
                                    </Link>
                                </li>
                                {/* Show Order History only if the user is not an admin */}
                                {userRole !== "admin" && (
                                    <li>
                                        <Link href="/orderHistory" className="text-white hover:text-gray-300">
                                            Order History
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-white hover:text-gray-300"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

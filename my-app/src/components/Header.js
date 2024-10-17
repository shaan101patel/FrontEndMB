/*
"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if localStorage is available (i.e., if we're in the browser)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token); // Set logged in state based on whether the token exists
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken"); // Clear auth token
      router.push("/login"); // Redirect to login page
    }
  };

  return (
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-white text-2xl font-bold">
              Cinema E-Booking
            </Link>
          </div>

          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
              </li>
              {!isLoggedIn ? (
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
              ) : (
                  <li>
                    <button
                        onClick={handleLogout}
                        className="text-white hover:text-gray-300"
                    >
                      Logout
                    </button>
                  </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default Header;
*/

"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if localStorage is available (i.e., if we're in the browser)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token); // Set logged in state based on whether the token exists
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken"); // Clear auth token
      setIsLoggedIn(false); // Update logged in state
      router.push("/login"); // Redirect to login page
    }
  };

  return (
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-white text-2xl font-bold">
              Cinema E-Booking
            </Link>
          </div>

          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
              </li>
              {!isLoggedIn ? (
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
              ) : (
                  <>
                    <li>
                      <Link href="/profile" className="text-white hover:text-gray-300">
                        Profile
                      </Link>
                    </li>
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

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


/*"use client"; // Ensure this is a Client Component

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

export default Header;*/

/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "../app/movieService"; // Adjust the path

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token); // Set logged in state based on whether the token exists
    }
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      if (typeof window !== "undefined") {
        // Call the backend to handle logout
        await logoutUser();

        // Remove token from localStorage
        localStorage.removeItem("authToken");

        // Update state and redirect to login page
        setIsLoggedIn(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle the error (e.g., show an error message)
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

export default Header;*/

/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "../app/movieService"; // Adjust the path

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token); // Set logged in state based on whether the token exists
    }
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Call the backend to handle logout
      await logoutUser(); // Optional, if your backend has a logout mechanism
      localStorage.removeItem("authToken"); // Clear auth token
      setIsLoggedIn(false); // Update logged in state
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle the error (e.g., show an error message)
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

export default Header;*/

/*"use client"; // Ensure this is a Client Component

import React from "react";
import Link from "next/link";

const Header = () => {
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
              <li>
                <Link href="/logout">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                    Logout
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default Header;*/

/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated based on the presence of the token
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("authToken");
    setIsAuthenticated(false); // Update state to reflect logout
    // Redirect to login page after logout
    window.location.href = "/login"; // Redirect to login page after logout
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
              {isAuthenticated ? (
                  <>
                    <li>
                      <button
                          onClick={handleLogout}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                      >
                        Logout
                      </button>
                    </li>
                  </>
              ) : (
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
              )}
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default Header;*/

/*"use client"; // Ensure this is a Client Component

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
      console.log("Token found in localStorage:", token); // Log the token found
      setIsLoggedIn(!!token); // Set logged in state based on whether the token exists
      console.log("Is logged in:", !!token); // Log whether the user is logged in
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken"); // Clear auth token
      console.log("Token removed, user logged out."); // Log logout action
      setIsLoggedIn(false); // Update login state
      router.push("/login"); // Redirect to login page
    }
  };
  console.log("Rendering Header. Is logged in:", isLoggedIn); // Log render state

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

export default Header;*/

/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if localStorage is available (i.e., if we're in the browser)
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      setIsLoggedIn(!!role); // Set logged in state based on whether the role exists
      setUserRole(role); // Store the user role
      console.log("Login status checked. Is logged in:", !!role); // Debug log
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole"); // Clear user role
      setIsLoggedIn(false); // Update logged-in state
      setUserRole(null); // Clear user role state
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

export default Header;*/

//WORKS
/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Check if localStorage is available (i.e., if we're in the browser)
        if (typeof window !== "undefined") {
            const role = localStorage.getItem("userRole");
            setIsLoggedIn(!!role); // Set logged in state based on whether the role exists
            setUserRole(role); // Store the user role
            console.log("Login status checked. Is logged in:", !!role); // Debug log
            console.log("User role retrieved from localStorage:", role); // Debug log
        }
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userRole"); // Clear user role
            setIsLoggedIn(false); // Update logged-in state
            setUserRole(null); // Clear user role state
            console.log("User logged out. Updated isLoggedIn:", false); // Debug log
            router.push("/login"); // Redirect to login page
        }
    };

    useEffect(() => {
        // Debugging to track changes in isLoggedIn and userRole
        console.log("isLoggedIn state changed:", isLoggedIn);
        console.log("userRole state changed:", userRole);
    }, [isLoggedIn, userRole]);

    console.log(isLoggedIn, userRole);
    console.log("hi heder");

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

export default Header;*/


//works for now
/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check localStorage for user role to determine login status
        const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
        setIsLoggedIn(!!role); // Set logged-in state based on role existence
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userRole"); // Clear user role
            setIsLoggedIn(false); // Update logged-in state
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

export default Header;*/

/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check localStorage for user role to determine login status
        const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
        setIsLoggedIn(!!role); // Set logged-in state based on role existence
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userRole"); // Clear user role
            setIsLoggedIn(false); // Update logged-in state
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
                        ) : ( // If logged in, show Logout button
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

export default Header;*/

//last shot
/*"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check localStorage for user role to determine login status
        const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
        setIsLoggedIn(!!role); // Set logged-in state based on role existence
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userRole"); // Clear user role
            setIsLoggedIn(false); // Update logged-in state
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
                        ) : ( // If logged in, show Logout button
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

export default Header;*/




"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const updateLoginStatus = () => {
            const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
            setIsLoggedIn(!!role); // Update logged-in state based on role existence
        };

        // Check localStorage for user role to determine login status on mount
        updateLoginStatus();

        // Listen for the custom 'login' event
        window.addEventListener('login', updateLoginStatus);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('login', updateLoginStatus);
        };
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userRole"); // Clear user role
            setIsLoggedIn(false); // Update logged-in state
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
                        ) : ( // If logged in, show Logout button
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




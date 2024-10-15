import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto text-center text-white">
        <div className="mb-4">
          <Link href="/" className="hover:underline mx-2">
            Home
          </Link>
          <Link href="/about" className="hover:underline mx-2">
            About Us
          </Link>
          <Link href="/contact" className="hover:underline mx-2">
            Contact
          </Link>
          <Link href="/terms" className="hover:underline mx-2">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:underline mx-2">
            Privacy Policy
          </Link>
        </div>
        <div>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Cinema E-Booking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

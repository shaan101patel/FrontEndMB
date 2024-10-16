import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <Link href="/" className="hover:underline mx-2 text-white">
              Home
            </Link>
            <Link href="/about" className="hover:underline mx-2 text-white">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline mx-2 text-white">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline mx-2 text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline mx-2 text-white">
              Privacy Policy
            </Link>
          </div>
          <div>
            <p className="text-xs text-white">
              &copy; {new Date().getFullYear()} Cinema E-Booking. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;


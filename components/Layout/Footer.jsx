import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
            <span className="font-semibold text-lg">Your App Name</span>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-4">Stay up to date with our latest courses and news.</p>
            {/* Newsletter signup form can be added here */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              {/* Add more useful links */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-orange-500">
                <FaFacebook />
              </Link>
              <Link href="#" className="hover:text-orange-500">
                <FaTwitter />
              </Link>
              <Link href="#" className="hover:text-orange-500">
                <FaInstagram />
              </Link>
              <Link href="#" className="hover:text-orange-500">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8">
        <p className="text-center text-gray-400">
          &copy; {new Date().getFullYear()} Your App Name. All rights reserved.{' '}
          <Link href="/privacy-policy"className="text-orange-500 hover:underline">Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="/privacy-policy"className="text-orange-500 hover:underline">Terms of Use
          </Link>
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;

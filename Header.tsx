'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

type HeaderProps = {
  isAuthenticated: boolean;
  userName?: string;
};

export default function Header({ isAuthenticated, userName }: HeaderProps) {
  const [sticky, setSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header 
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        sticky ? 'shadow-lg border-b border-gray-100' : 'border-b border-transparent'
      }`}
      role="banner"
      aria-label="Main header"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Gitarth Ganga Home">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <NextImage 
                  src="/images/logo.svg" 
                  alt="Gitarth Ganga Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  Gitarth Ganga
                </span>
                <span className="text-xs text-blue-600 font-medium -mt-1 hidden sm:block">
                  Arya Yug
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
            >
              Home
            </Link>
            <Link 
              href="/search" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
            >
              Search
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4">
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
                >
                  Dashboard
                </Link>
                {userName && (
                  <span className="text-gray-700 px-3 py-2 text-sm font-medium bg-gray-50 rounded-lg">
                    {userName}
                  </span>
                )}
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ml-4"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200" 
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/search" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {userName && (
                    <div className="px-3 py-2 text-base font-medium text-gray-700 bg-gray-50 rounded-lg">
                      Welcome, {userName}
                    </div>
                  )}
                  <button 
                    className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
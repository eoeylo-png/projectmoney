import React, { useState } from 'react';
import { Plane, Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AirHelp</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Flight Problems</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Help Center</a>
            <div className="flex items-center space-x-2 text-gray-700">
              <Globe className="h-4 w-4" />
              <span>EN</span>
            </div>
            <button 
              onClick={() => window.location.href = '/claim'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check Your Flight
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Flight Problems</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Help Center</a>
              <button 
                onClick={() => window.location.href = '/claim'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                Check Your Flight
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
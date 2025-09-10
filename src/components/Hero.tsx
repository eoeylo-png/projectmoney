import React, { useState } from 'react';
import { Calendar, MapPin, Search, Plane } from 'lucide-react';

const Hero = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [date, setDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Get up to{' '}
                <span className="text-blue-600">€600</span>{' '}
                compensation
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Flight delayed, cancelled or overbooked? You could be entitled to compensation of up to €600 per passenger.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No win, no fee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>3 years back</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>98% success rate</span>
              </div>
            </div>

            {/* Flight Check Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Check if you're entitled to compensation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Flight number (e.g. BA123)"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="From (e.g. London)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="To (e.g. Paris)"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button 
                onClick={() => window.location.href = '/claim'}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
              >
                <Search className="h-5 w-5" />
                <span>Check My Flight</span>
              </button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Plane className="h-12 w-12 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">€600</h3>
                  <p className="text-gray-600">Maximum compensation per passenger</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">16M+</div>
                    <div className="text-sm text-gray-600">Passengers helped</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-sm text-gray-600">Success rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">€1.5B</div>
                    <div className="text-sm text-gray-600">Won for passengers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import Slider from '../components/common/Slider';

export default function Dashboard() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                 Payment Link Dashboard
              </h1>
            </div>
          </div>
        </div>
      </nav>
      <Slider/>
    </div>
  );
}
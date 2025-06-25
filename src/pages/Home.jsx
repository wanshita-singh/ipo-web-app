import React, { useState } from 'react';
import IPOCard from '../components/IPOCard';
import ipoData from '../data/dummyIpoData.json';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  // Get unique sectors from the data
  const sectors = ['All', ...new Set(ipoData.map((ipo) => ipo.sector))];

  // Filter by search + sector
  const filteredIPOs = ipoData.filter((ipo) => {
    const matchesSearch = ipo.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || ipo.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Upcoming IPOs</h1>

      {/* 🔍 Search Box */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by company name..."
          className="w-full max-w-md px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🏷️ Sector Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={`px-4 py-2 rounded-full border ${
              selectedSector === sector
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'
            } transition`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* 🧩 IPO Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredIPOs.length > 0 ? (
          filteredIPOs.map((ipo) => <IPOCard key={ipo.id} ipo={ipo} />)
        ) : (
          <p className="text-center col-span-full text-gray-600">No IPOs found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

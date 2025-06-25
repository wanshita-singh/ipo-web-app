import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ipoData from '../data/dummyIpoData.json';

const IPODetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find IPO by ID
  const ipo = ipoData.find((item) => item.id.toString() === id);

  if (!ipo) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold">IPO not found.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md mt-6">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <img src={ipo.logo} alt={ipo.company_name} className="w-28 h-28 object-contain mb-4" />
      <h1 className="text-2xl font-bold mb-2">{ipo.company_name}</h1>
      <p className="text-gray-700 mb-2">📅 Open: {ipo.open_date} | Close: {ipo.close_date}</p>
      <p className="text-gray-700 mb-2">💰 Price Band: {ipo.price_band}</p>
      <p className="text-gray-700 mb-2">📦 Lot Size: {ipo.lot_size}</p>
      <p className="text-gray-700 mb-2">🏢 Sector: {ipo.sector}</p>
      <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Apply Now
      </button>
    </div>
  );
};

export default IPODetail;

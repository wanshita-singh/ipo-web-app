import React from 'react';
import { useNavigate } from 'react-router-dom';

const IPOCard = ({ ipo }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer border rounded-lg p-4 shadow-md hover:shadow-xl transition duration-300 bg-white"
      onClick={() => navigate(`/ipo/${ipo.id}`)}
    >
      <img src={ipo.logo} alt={`${ipo.company_name} logo`} className="w-20 h-20 object-contain mb-2" />
      <h2 className="text-xl font-semibold text-blue-700">{ipo.company_name}</h2>
      <p className="text-gray-600">Price Band: {ipo.price_band}</p>
      <p className="text-gray-600">Open: {ipo.open_date} | Close: {ipo.close_date}</p>
      <p className="text-gray-600">Lot Size: {ipo.lot_size}</p>
      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Apply Now
      </button>
    </div>
  );
};

export default IPOCard;

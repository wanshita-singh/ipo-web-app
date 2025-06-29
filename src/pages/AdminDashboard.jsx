import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Step A: Default IPOs for Reset
const DEFAULT_IPOS = [
  {
    id: "1",
    company_name: "AlphaTech Ltd.",
    logo: "/assets/alpha-logo.png", // 
    price_band: "₹120 - ₹135",
    open_date: "2025-07-01",
    close_date: "2025-07-03",
    lot_size: 50,
    sector: "Technology"
  },
  {
    id: "2",
    company_name: "FinServe Pvt. Ltd.",
    logo: "/assets/finserve-logo.png", // 
    price_band: "₹300 - ₹320",
    open_date: "2025-07-05",
    close_date: "2025-07-08",
    lot_size: 45,
    sector: "Finance"
  }
];


const AdminDashboard = () => {
  const initialData = JSON.parse(localStorage.getItem('adminIpos')) || [];
  const [ipos, setIpos] = useState(initialData);
  const [formData, setFormData] = useState({
    id: '',
    company_name: '',
    logo: '',
    price_band: '',
    open_date: '',
    close_date: '',
    lot_size: '',
    sector: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // ✅ Step B: Logout & Reset
  const handleLogout = () => {
    navigate('/login');
  };

  const handleReset = () => {
    if (window.confirm('Reset all IPO data to default?')) {
      setIpos(DEFAULT_IPOS);
    }
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('adminIpos', JSON.stringify(ipos));
  }, [ipos]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.company_name ||
      !formData.logo ||
      !formData.price_band ||
      !formData.open_date ||
      !formData.close_date ||
      !formData.lot_size ||
      !formData.sector
    ) {
      alert('Please fill all fields.');
      return;
    }

    if (isEditing) {
      setIpos(ipos.map((ipo) => (ipo.id === formData.id ? formData : ipo)));
      setIsEditing(false);
    } else {
      setIpos([...ipos, { ...formData, id: Date.now().toString() }]);
    }

    setFormData({
      id: '',
      company_name: '',
      logo: '',
      price_band: '',
      open_date: '',
      close_date: '',
      lot_size: '',
      sector: '',
    });
  };

  const handleEdit = (ipo) => {
    setFormData(ipo);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this IPO?')) {
      setIpos(ipos.filter((ipo) => ipo.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ✅ Step C: Header with buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={handleReset}
            className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
          >
            Reset Data
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* IPO Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} className="input" />
          <input name="logo" placeholder="Logo URL" value={formData.logo} onChange={handleChange} className="input" />
          <input name="price_band" placeholder="Price Band (e.g., ₹120 - ₹135)" value={formData.price_band} onChange={handleChange} className="input" />
          <input name="lot_size" type="number" placeholder="Lot Size" value={formData.lot_size} onChange={handleChange} className="input" />
          <input name="open_date" type="date" value={formData.open_date} onChange={handleChange} className="input" />
          <input name="close_date" type="date" value={formData.close_date} onChange={handleChange} className="input" />
          <input name="sector" placeholder="Sector (e.g., Finance)" value={formData.sector} onChange={handleChange} className="input" />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEditing ? 'Update IPO' : 'Add IPO'}
        </button>
      </form>

      {/* IPO Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-blue-700 text-left">
              <th className="p-3">Company</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Price</th>
              <th className="p-3">Lot</th>
              <th className="p-3">Sector</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ipos.map((ipo) => (
              <tr key={ipo.id} className="border-t">
                <td className="p-3">{ipo.company_name}</td>
                <td className="p-3">{ipo.open_date} → {ipo.close_date}</td>
                <td className="p-3">{ipo.price_band}</td>
                <td className="p-3">{ipo.lot_size}</td>
                <td className="p-3">{ipo.sector}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(ipo)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(ipo.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
            {ipos.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="6">
                  No IPOs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

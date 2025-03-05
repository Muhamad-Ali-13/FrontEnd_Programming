// pages/transactions.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Transactions() {
  // Data for Transactions
  const [transactions] = useState([
    {
      id: 1,
      room: 'Deluxe Room',
      guest: 'John Doe',
      checkIn: '2023-10-01',
      checkOut: '2023-10-05',
      status: 'Confirmed',
      total: '$600',
    },
    {
      id: 2,
      room: 'Standard Room',
      guest: 'Jane Smith',
      checkIn: '2023-10-02',
      checkOut: '2023-10-04',
      status: 'Checked In',
      total: '$400',
    },
    {
      id: 3,
      room: 'Suite Room',
      guest: 'Emily Davis',
      checkIn: '2023-10-03',
      checkOut: '2023-10-07',
      status: 'Cancelled',
      total: '$1000',
    },
    {
      id: 4,
      room: 'Family Room',
      guest: 'Michael Brown',
      checkIn: '2023-10-05',
      checkOut: '2023-10-10',
      status: 'Confirmed',
      total: '$800',
    },
  ]);

  // State for Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  // State for Validation Popup
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  // Function to handle adding a transaction
  const handleAddTransaction = () => {
    // Simulate validation success
    setShowValidationPopup(true);
    setTimeout(() => setShowValidationPopup(false), 3000); // Hide popup after 3 seconds
  };

  // Filter Transactions Based on Search Term
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Validation Popup */}
      {showValidationPopup && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
        >
          Transaction added successfully!
        </motion.div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transactions</h1>

        {/* Search Bar and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by guest name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4 md:mb-0"
          />
          <button
            onClick={handleAddTransaction}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Add Transaction
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.guest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.checkOut}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      transaction.status === 'Confirmed'
                        ? 'text-green-600'
                        : transaction.status === 'Checked In'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-2">
                    <Link href={`/transactions/${transaction.id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900 transition duration-300">
                        View Details
                      </button>
                    </Link>
                    <button className="text-red-600 hover:text-red-900 transition duration-300">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
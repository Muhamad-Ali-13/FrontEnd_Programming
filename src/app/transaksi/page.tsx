'use client';
import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import TransactionTable from '../../components/TransactionTable';
import Pagination from '../../components/Pagination';
import TransactionModal from '../../components/TransactionModal';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const itemsPerPage = 5;

  // Fetch transactions and rooms data
  useEffect(() => {
    Promise.all([
      fetch('/api/transactions').then((res) => res.json()),
      fetch('/api/rooms').then((res) => res.json()),
    ]).then(([transactionsData, roomsData]) => {
      setTransactions(transactionsData);
      setRooms(roomsData);
    });
  }, []);

  // Filter data based on search term (by bookedBy)
  const filteredTransactions = transactions.filter((t) =>
    t.bookedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Save transaction (create/update)
  const handleSaveTransaction = (newTransaction: any) => {
    if (selectedTransaction) {
      // Update existing transaction
      fetch(`/api/transactions?id=${selectedTransaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      }).then(() => {
        setTransactions((prev) =>
          prev.map((t) => (t.id === selectedTransaction.id ? { ...t, ...newTransaction } : t))
        );
      });
    } else {
      // Create new transaction
      fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      })
        .then((res) => res.json())
        .then((data) => setTransactions([...transactions, data]));
    }
    setIsModalOpen(false);
  };

  // Delete transaction
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      fetch(`/api/transactions?id=${id}`, { method: 'DELETE' }).then(() => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">
      Daftar Booking
    </h1>

    <div className="p-6">
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Add Button */}
      <button
        onClick={() => {
          setSelectedTransaction(null);
          setIsModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Tambah Transaksi
      </button>

      {/* Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTransaction}
        initialData={selectedTransaction}
        rooms={rooms}
      />

      {/* Table */}
      <TransactionTable
        transactions={currentItems}
        rooms={rooms}
        onEdit={(transaction) => {
          setSelectedTransaction(transaction);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <Pagination
        totalItems={filteredTransactions.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
    </div>
  );
}
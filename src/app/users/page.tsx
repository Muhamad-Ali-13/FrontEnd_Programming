'use client';
import { useState, useEffect } from 'react';
import Modal from '../../components/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersPage = () => {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<User>({ id: 0, name: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openAddModal = () => {
    setFormData({ id: 0, name: '', email: '' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setFormData(user);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addUser = () => {
    if (!formData.name || !formData.email) {
      toast.error('Nama dan Email harus diisi!', { position: 'top-right' });
      return;
    }
    const newUser = { ...formData, id: Date.now() };
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
    setCurrentPage(1);
    closeModal();
    toast.success('Data berhasil ditambahkan!', { position: 'top-right' });
  };

  const editUser = () => {
    if (!formData.name || !formData.email) {
      toast.error('Nama dan Email harus diisi!', { position: 'top-right' });
      return;
    }
    const updatedUsers = users.map(user => 
      user.id === formData.id ? formData : user
    );
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers);
    closeModal();
    toast.success('Data berhasil diperbarui!', { position: 'top-right' });
  };

  const deleteUser = (id: number) => {
    if (window.confirm('Apakah Anda yakin?')) {
      const filtered = users.filter(user => user.id !== id);
      setUsers(filtered);
      saveToLocalStorage(filtered);
      toast.success('Data berhasil dihapus!', { position: 'top-right' });
    }
  };

  const saveToLocalStorage = (data: User[]) => {
    localStorage.setItem('users', JSON.stringify(data));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">
        Daftar User
      </h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari nama pengguna..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 p-2 w-1/2 rounded focus:outline-none focus:border-gray-500"
        />
        <button
          onClick={openAddModal}
          className="bg-gray-700 text-white px-5 rounded hover:bg-gray-500 transition duration-300"
        >
          Tambah Data
        </button>
      </div>

      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border p-3">No</th>
            <th className="border p-3">Nama</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border p-3 text-center">
                {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
              </td>
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">{user.email}</td>
              <td className="border p-3 text-center">
                <button
                  onClick={() => openEditModal(user)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        >
          Last
        </button>
      </div>

      {/* Modal Tambah Data */}
      <Modal isOpen={isAddModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
          Tambah Data Pengguna
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={addUser}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
          >
            Simpan
          </button>
        </form>
      </Modal>

      {/* Modal Edit Data */}
      <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
          Edit Data Pengguna
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={editUser}
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-300"
          >
            Perbarui
          </button>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default UsersPage;
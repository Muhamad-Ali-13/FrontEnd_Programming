'use client';
import { useState } from 'react';
import Modal from '../../components/modal';

const UsersPage = () => {
  // State untuk menyimpan data user
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  // State untuk modal tambah/edit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State untuk form tambah/edit
  const [formData, setFormData] = useState({ id: null, name: '', email: '' });

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Fungsi untuk membuka modal tambah
  const openAddModal = () => {
    setFormData({ id: null, name: '', email: '' });
    setIsAddModalOpen(true);
  };

  // Fungsi untuk membuka modal edit
  const openEditModal = (user) => {
    setFormData(user);
    setIsEditModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  // Fungsi untuk menambah data
  const addUser = () => {
    if (!formData.name || !formData.email) {
      alert('Nama dan Email harus diisi!');
      return;
    }
    const newUser = { id: Date.now(), ...formData };
    setUsers([...users, newUser]);
    closeModal();
    alert('Data berhasil ditambahkan!');
  };

  // Fungsi untuk mengedit data
  const editUser = () => {
    if (!formData.name || !formData.email) {
      alert('Nama dan Email harus diisi!');
      return;
    }
    const updatedUsers = users.map((user) =>
      user.id === formData.id ? formData : user
    );
    setUsers(updatedUsers);
    closeModal();
    alert('Data berhasil diperbarui!');
  };

  // Fungsi untuk menghapus data
  const deleteUser = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
      alert('Data berhasil dihapus!');
    }
  };

  // Filter data berdasarkan pencarian
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>

      {/* Pencarian */}
      <input
        type="text"
        placeholder="Cari nama pengguna..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Tombol Tambah Data */}
      <button
        onClick={openAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Tambah Data
      </button>

      {/* Tabel Data User */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">No</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Tambah Data */}
      <Modal isOpen={isAddModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Tambah Data Pengguna</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Nama</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 w-full"
            />
          </div>
          <button
            type="button"
            onClick={addUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </form>
      </Modal>

      {/* Modal Edit Data */}
      <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Edit Data Pengguna</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Nama</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 w-full"
            />
          </div>
          <button
            type="button"
            onClick={editUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Perbarui
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UsersPage;
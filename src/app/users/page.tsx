"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
  id: number;
  name: string;
  email: string;
};

const UserManagement = () => {
  // State data dan modal
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State modal (untuk tambah & edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const initialModalUser: User = {
    id: 0,
    name: "",
    email: "",
  };
  const [modalUser, setModalUser] = useState<User>(initialModalUser);

  // Modal helper functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Ambil data dari localStorage atau sampleData
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers);
        }
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    } else {
      const sampleData: User[] = [
        {
          id: 1,
          name: "Ali",
          email: "ali@gmail.com",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
        },
      ];
      setUsers(sampleData);
      localStorage.setItem("users", JSON.stringify(sampleData));
    }
  }, []);

  // Simpan data ke localStorage setiap kali ada perubahan pada users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Reset halaman ke 1 saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fungsi search berdasarkan semua field
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.id.toString().includes(searchLower) ||
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  // Fungsi sorting berdasarkan field
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof User];
    const bValue = b[sortField as keyof User];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Render indikator sort pada header
  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  // CRUD: Tambah atau Edit User melalui modal
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (!modalUser.name || !modalUser.email) {
      toast.error("Semua field harus diisi!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (isEditMode) {
      // Edit: Update data user
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === modalUser.id ? modalUser : user))
      );
      toast.success("Data berhasil diperbarui!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Tambah: Generate id baru, dan tambahkan user baru
      const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers((prevUsers) => [...prevUsers, { ...modalUser, id: newId }]);
      toast.success("Data berhasil disimpan!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    closeModal();
    setModalUser(initialModalUser);
  };

  // Fungsi delete user dengan konfirmasi
  const handleDeleteUser = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success("Pengguna berhasil dihapus!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Daftar Pengguna
      </h1>
      <div className="min-h-screen bg-gray-100 flex justify-center p-9">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl h-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 w-full sm:w-auto"
            />
            {/* Add New Button */}
            <button
              onClick={() => {
                setModalUser(initialModalUser);
                setIsEditMode(false);
                openModal();
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Add New User
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th
                    className="px-6 py-3 cursor-pointer select-none"
                    onClick={() => handleSort("id")}
                  >
                    NO{renderSortIndicator("id")}
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none"
                    onClick={() => handleSort("name")}
                  >
                    NAME{renderSortIndicator("name")}
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none"
                    onClick={() => handleSort("email")}
                  >
                    EMAIL{renderSortIndicator("email")}
                  </th>
                  <th className="px-6 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 space-y-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setModalUser(user);
                            setIsEditMode(true);
                            openModal();
                          }}
                          className="focus:outline-none text-gray-50 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal Section untuk Tambah/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {isEditMode ? "Edit User" : "Tambah User"}
              </h2>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={modalUser.name}
                    onChange={(e) =>
                      setModalUser({ ...modalUser, name: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={modalUser.email}
                    onChange={(e) =>
                      setModalUser({ ...modalUser, email: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                  >
                    {isEditMode ? "Simpan Perubahan" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Container untuk Notifikasi */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default UserManagement;
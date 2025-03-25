"use client";

import { useState, useMemo, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Table() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const pageSize = 5;

  // Fetch data dari file JSON (pastikan file users.json ada di public/users.json)
  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Filtering data berdasarkan pencarian
  const filteredData = useMemo(() => {
    let filtered = users.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    // Sorting data
    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [search, sortBy, sortOrder, users]);

  // Paginasi data
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handle sorting
  const handleSort = (field: keyof User) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Handle modal open/close
  const actionModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle submit untuk tambah data
  const handleSubmit = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Nama dan Email harus diisi!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const newEntry = {
      id: users.length + 1,
      ...newUser,
    };
    setUsers([...users, newEntry]);
    setIsModalOpen(false);
    setNewUser({ name: "", email: "" });

    // Notifikasi sukses
    toast.success("Data berhasil disimpan!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">
        Daftar User
      </h1>

      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Button Tambah User */}
        <button
          onClick={actionModal}
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition duration-300"
        >
          Tambah User
        </button>

        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-gray-500"
        />

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th
                  className="py-3 px-4 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  ID{" "}
                  {sortBy === "id" && (
                    <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
                <th
                  className="py-3 px-4 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Nama{" "}
                  {sortBy === "name" && (
                    <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
                <th
                  className="py-3 px-4 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortBy === "email" && (
                    <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 disabled:opacity-100 transition duration-100"
          >
            Previous
          </button>
          <span className="text-gray-900">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-900 disabled:opacity-100 transition duration-200"
          >
            Next
          </button>
        </div>

        {/* Modal Tambah Data */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-lg font-bold mb-4 text-gray-700">
                Tambah User
              </h2>
              <input
                type="text"
                placeholder="Nama"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-gray-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-gray-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={actionModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition duration-300"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifikasi */}
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
}

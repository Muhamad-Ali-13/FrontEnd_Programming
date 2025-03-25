"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Room = {
  id: number;
  name: string;
  capacity: number;
  category:
    | "kelas"
    | "labolatorium"
    | "perpustakaan"
    | "auditorium"
    | "lainnya";
  price: number;
  status: "Available" | "approved" | "rejected";
};

const RoomManagement = () => {
  // State data dan modal
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State modal (untuk tambah & edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const initialModalRoom: Room = {
    id: 0,
    name: "",
    capacity: 0,
    category: "kelas",
    price: 0,
    status: "Available",
  };
  const [modalRoom, setModalRoom] = useState<Room>(initialModalRoom);

  // Modal helper functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Ambil data dari localStorage atau sampleData
  useEffect(() => {
    const savedRooms = localStorage.getItem("rooms");
    if (savedRooms) {
      try {
        const parsedRooms = JSON.parse(savedRooms);
        if (Array.isArray(parsedRooms)) {
          setRooms(parsedRooms);
        }
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    } else {
      const sampleData: Room[] = [
        {
          "id": 1,
          "name": "201",
          "capacity": 40,
          "category": "kelas",
          "price": 1500000,
          "status": "Available"
        },
        {
          "id": 2,
          "name": "202",
          "capacity": 25,
          "category": "labolatorium",
          "price": 2500000,
          "status": "Available"
        },
        {
          "id": 3,
          "name": "203",
          "capacity": 100,
          "category": "perpustakaan",
          "price": 2000000,
          "status": "Available"
        },
        {
          "id": 4,
          "name": "204",
          "capacity": 300,
          "category": "auditorium",
          "price": 3500000,
          "status": "Available"
        },
        {
          "id": 5,
          "name": "205",
          "capacity": 50,
          "category": "lainnya",
          "price": 1800000,
          "status": "Available"
        },
        {
          "id": 6,
          "name": "206",
          "capacity": 10,
          "category": "kelas",
          "price": 2000000,
          "status": "Available"
        },
      ];
      setRooms(sampleData);
      localStorage.setItem("rooms", JSON.stringify(sampleData));
    }
  }, []);

  // Simpan data ke localStorage setiap kali ada perubahan pada rooms
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  // Reset halaman ke 1 saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fungsi search berdasarkan semua field
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRooms = rooms.filter((room) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      room.id.toString().includes(searchLower) ||
      room.name.toLowerCase().includes(searchLower) ||
      room.capacity.toString().includes(searchLower) ||
      room.category.toLowerCase().includes(searchLower) ||
      room.price.toString().includes(searchLower) ||
      room.status.toLowerCase().includes(searchLower)
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

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof Room];
    const bValue = b[sortField as keyof Room];
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
  const currentRooms = sortedRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedRooms.length / itemsPerPage);

  // Render indikator sort pada header
  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  // CRUD: Tambah atau Edit Room melalui modal
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (!modalRoom.name || !modalRoom.capacity || !modalRoom.category || !modalRoom.price) {
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
      // Edit: Update data room
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === modalRoom.id ? modalRoom : room))
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
      // Tambah: Generate id baru, dan tambahkan room baru
      const newId =
        rooms.length > 0 ? Math.max(...rooms.map((r) => r.id)) + 1 : 1;
      setRooms((prevRooms) => [...prevRooms, { ...modalRoom, id: newId }]);
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
    setModalRoom(initialModalRoom);
  };

  // Fungsi delete room dengan konfirmasi
  const handleDeleteRoom = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
      toast.success("Ruangan berhasil dihapus!", {
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
        Daftar Rooms
      </h1>
      <div className="min-h-screen bg-gray-100 flex justify-center p-9">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl h-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 w-full sm:w-auto"
            />
            {/* Add New Button */}
            <button
              onClick={() => {
                setModalRoom(initialModalRoom);
                setIsEditMode(false);
                openModal();
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Add New Room
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
                    onClick={() => handleSort("capacity")}
                  >
                    CAPACITY{renderSortIndicator("capacity")}
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none"
                    onClick={() => handleSort("category")}
                  >
                    CATEGORY{renderSortIndicator("category")}
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none"
                    onClick={() => handleSort("price")}
                  >
                    PRICE{renderSortIndicator("price")}
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer select-none"
                    onClick={() => handleSort("status")}
                  >
                    STATUS{renderSortIndicator("status")}
                  </th>
                  <th className="px-6 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{room.id}</td>
                    <td className="px-6 py-4">{room.name}</td>
                    <td className="px-6 py-4">{room.capacity}</td>
                    <td className="px-6 py-4">{room.category}</td>
                    <td className="px-6 py-4">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(room.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          room.status === "approved"
                            ? "bg-green-500"
                            : room.status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {room.status.charAt(0).toUpperCase() +
                          room.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-y-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            toast.success("Ruangan disetujui!", {
                              position: "top-right",
                              autoClose: 3000,
                            })
                          }
                          className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            toast.error("Ruangan ditolak!", {
                              position: "top-right",
                              autoClose: 3000,
                            })
                          }
                          className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1"
                        >
                          Reject
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setModalRoom(room);
                            setIsEditMode(true);
                            openModal();
                          }}
                          className="focus:outline-none text-gray-50 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
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
                {isEditMode ? "Edit Room" : "Tambah Room"}
              </h2>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={modalRoom.name}
                    onChange={(e) =>
                      setModalRoom({ ...modalRoom, name: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={modalRoom.capacity}
                    onChange={(e) =>
                      setModalRoom({
                        ...modalRoom,
                        capacity: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={modalRoom.category}
                    onChange={(e) =>
                      setModalRoom({
                        ...modalRoom,
                        category: e.target.value as Room["category"],
                      })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500"
                    required
                  >
                    <option value="kelas">Kelas</option>
                    <option value="labolatorium">Labolatorium</option>
                    <option value="perpustakaan">Perpustakaan</option>
                    <option value="auditorium">Auditorium</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    value={modalRoom.price}
                    onChange={(e) =>
                      setModalRoom({
                        ...modalRoom,
                        price: Number(e.target.value),
                      })
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

export default RoomManagement;
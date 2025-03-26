"use client";
import { useState, useEffect } from "react";

// Tipe data untuk Booking, Room, dan User
type Booking = {
  id: number;
  roomId: number; // ID ruangan yang dipesan
  bookingDate: string; // Format YYYY-MM-DD
  bookedBy: number; // ID user yang memesan
  price: number; // Diambil dari room.price
};

type RoomData = {
  id: number;
  name: string;
  price: number;
};

type UserData = {
  id: number;
  name: string;
  email: string;
};

const BookingManagement = () => {
  // State utama
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State modal untuk tambah/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const initialModalBooking: Booking = {
    id: 0,
    roomId: 0,
    bookingDate: new Date().toISOString().slice(0, 10), // default tanggal sekarang
    bookedBy: 0,
    price: 0,
  };
  const [modalBooking, setModalBooking] =
    useState<Booking>(initialModalBooking);

  // Modal helper functions
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Simpan ke localStorage dengan debounce
  const saveToLocalStorage = (bookingsToSave: Booking[]) => {
    try {
      localStorage.setItem("bookings", JSON.stringify(bookingsToSave));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage:", error);
    }
  };

  // Simpan data ke localStorage saat ada perubahan
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(bookings);
    }, 500); // Delay 500ms untuk debounce

    return () => clearTimeout(timeoutId);
  }, [bookings]);

  // Muat data dari localStorage atau sampleData
  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const savedBookings = localStorage.getItem("bookings");
        if (savedBookings) {
          const parsedBookings = JSON.parse(savedBookings);

          // Validasi struktur data
          const isValid = parsedBookings.every(
            (booking: any) =>
              booking.id &&
              booking.roomId &&
              booking.bookingDate &&
              booking.bookedBy &&
              booking.price &&
              typeof booking.id === "number" &&
              typeof booking.roomId === "number" &&
              typeof booking.bookingDate === "string" &&
              typeof booking.bookedBy === "number" &&
              typeof booking.price === "number"
          );

          if (isValid) return parsedBookings;
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
      return null;
    };

    const savedData = loadFromLocalStorage();
    if (savedData) {
      setBookings(savedData);
    } else {
      // Inisialisasi data sample jika localStorage kosong
      const sampleData: Booking[] = [
        {
          id: 1,
          roomId: 1,
          bookingDate: "2023-10-01",
          bookedBy: 1,
          price: 1500000,
        },
        {
          id: 2,
          roomId: 2,
          bookingDate: "2023-10-02",
          bookedBy: 2,
          price: 2500000,
        },
      ];
      setBookings(sampleData);
      saveToLocalStorage(sampleData);
    }
  }, []);

  // Fetch data dari rooms.json dan users.json
  useEffect(() => {
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Reset halaman ke 1 saat search query berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Helper functions untuk mendapatkan nama Room dan User
  const getRoomName = (roomId: number): string => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.name : "Unknown Room";
  };

  const getUserName = (userId: number): string => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  // Filtering: cari berdasarkan ID, room name, booking date, user name, atau price
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchQuery.toLowerCase();
    const roomName = getRoomName(booking.roomId).toLowerCase();
    const bookedByName = getUserName(booking.bookedBy).toLowerCase();
    return (
      booking.id.toString().includes(searchLower) ||
      roomName.includes(searchLower) ||
      booking.bookingDate.toLowerCase().includes(searchLower) ||
      bookedByName.includes(searchLower) ||
      booking.price.toString().includes(searchLower)
    );
  });

  // Sorting: untuk field "room" dan "bookedBy" sorting berdasarkan nama
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === "room") {
      const aName = getRoomName(a.roomId);
      const bName = getRoomName(b.roomId);
      return sortOrder === "asc"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    }
    if (sortField === "bookedBy") {
      const aName = getUserName(a.bookedBy);
      const bName = getUserName(b.bookedBy);
      return sortOrder === "asc"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    }
    // Untuk field lainnya (misal id, bookingDate, price)
    const aValue = a[sortField as keyof Booking];
    const bValue = b[sortField as keyof Booking];
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
  const currentBookings = sortedBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  // CRUD: Tambah atau Edit Booking melalui modal
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ambil harga dari room yang dipilih
    const selectedRoom = rooms.find((r) => r.id === modalBooking.roomId);
    const derivedPrice = selectedRoom ? selectedRoom.price : 0;
    const bookingData: Booking = { ...modalBooking, price: derivedPrice };
    if (isEditMode) {
      // Update booking
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingData.id ? bookingData : booking
        )
      );
    } else {
      // Tambah booking baru dengan ID baru
      const newId =
        bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;
      setBookings((prev) => [...prev, { ...bookingData, id: newId }]);
    }
    closeModal();
    setModalBooking(initialModalBooking);
  };

  const handleDeleteBooking = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Daftar Booking
      </h1>
      <div className="min-h-screen bg-gray-100 flex justify-center p-9">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-7xl h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <button
              onClick={() => {
                // Set default tanggal ke hari ini
                setModalBooking({
                  ...initialModalBooking,
                  bookingDate: new Date().toISOString().slice(0, 10),
                });
                setIsEditMode(false);
                openModal();
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Add New
            </button>
          </div>
          {/* Tabel */}
          <div className="overflow-x-auto shadow-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-sm text-gray-700 uppercase bg-white">
                <tr className="bg-white border-t border-b hover:bg-gray-50">
                  <th
                    onClick={() => handleSort("id")}
                    className="px-6 py-3 text-center cursor-pointer select-none"
                  >
                    ID {renderSortIndicator("id")}
                  </th>
                  <th
                    onClick={() => handleSort("room")}
                    className="px-6 py-3 text-center cursor-pointer select-none"
                  >
                    Room {renderSortIndicator("room")}
                  </th>
                  <th
                    onClick={() => handleSort("bookingDate")}
                    className="px-6 py-3 text-center cursor-pointer select-none"
                  >
                    Booking Date {renderSortIndicator("bookingDate")}
                  </th>
                  <th
                    onClick={() => handleSort("bookedBy")}
                    className="px-6 py-3 text-center cursor-pointer select-none"
                  >
                    Booked By {renderSortIndicator("bookedBy")}
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    className="px-6 py-3 text-center cursor-pointer select-none"
                  >
                    Price {renderSortIndicator("price")}
                  </th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 text-center">{booking.id}</td>
                    <td className="px-4 py-2 text-center">
                      {getRoomName(booking.roomId)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(booking.bookingDate).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="px-4 py-2 text-left">
                      {getUserName(booking.bookedBy)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(booking.price)}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <div className="flex flex-row space-x-2">
                        <button
                          onClick={() => {
                            setModalBooking(booking);
                            setIsEditMode(true);
                            openModal();
                          }}
                          className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
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
          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        {/* Modal untuk Tambah/Edit Booking */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-2xl font-bold mb-4">
                {isEditMode ? "Edit Booking" : "Add New Booking"}
              </h2>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Room</label>
                  <select
                    value={modalBooking.roomId}
                    onChange={(e) =>
                      setModalBooking({
                        ...modalBooking,
                        roomId: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                    required
                  >
                    <option value={0} disabled>
                      -- Pilih Room --
                    </option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    value={modalBooking.bookingDate}
                    onChange={(e) =>
                      setModalBooking({
                        ...modalBooking,
                        bookingDate: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Booked By</label>
                  <select
                    value={modalBooking.bookedBy}
                    onChange={(e) =>
                      setModalBooking({
                        ...modalBooking,
                        bookedBy: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                    required
                  >
                    <option value={0} disabled>
                      -- Pilih User --
                    </option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                  >
                    {isEditMode ? "Save Changes" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;

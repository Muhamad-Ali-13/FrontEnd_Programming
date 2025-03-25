"use client";
import { useState, useEffect } from "react";

type Booking = {
  id: number;
  roomId: number;
  bookingDate: string;
  bookedBy: number;
  price: number;
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({
    roomId: "",
    bookingDate: "",
    bookedBy: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
    show: false,
  });

  const initialModalBooking: Booking = {
    id: 0,
    roomId: 0,
    bookingDate: new Date().toISOString().slice(0, 10),
    bookedBy: 0,
    price: 0,
  };

  const [modalBooking, setModalBooking] = useState<Booking>(initialModalBooking);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({ roomId: "", bookingDate: "", bookedBy: "" });
  };

  const saveToLocalStorage = (bookingsToSave: Booking[]) => {
    try {
      localStorage.setItem("bookings", JSON.stringify(bookingsToSave));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(bookings);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [bookings]);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const savedBookings = localStorage.getItem("bookings");
        if (savedBookings) {
          const parsedBookings = JSON.parse(savedBookings);
          const isValid = parsedBookings.every(
            (booking: any) =>
              booking.id &&
              booking.roomId &&
              booking.bookingDate &&
              booking.bookedBy &&
              booking.price
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const getRoomName = (roomId: number): string => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.name : "Unknown Room";
  };

  const getUserName = (userId: number): string => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

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
    const aValue = a[sortField as keyof Booking];
    const bValue = b[sortField as keyof Booking];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

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

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({ roomId: "", bookingDate: "", bookedBy: "" });
    setNotification({ message: "", type: "success", show: false });

    // Validasi Room
    const selectedRoom = rooms.find((r) => r.id === modalBooking.roomId);
    if (!selectedRoom) {
      setFormErrors((prev) => ({ ...prev, roomId: "Room harus dipilih" }));
      setNotification({
        message: "Room harus dipilih!",
        type: "error",
        show: true,
      });
      return;
    }

    // Validasi User
    const selectedUser = users.find((u) => u.id === modalBooking.bookedBy);
    if (!selectedUser) {
      setFormErrors((prev) => ({ ...prev, bookedBy: "User harus dipilih" }));
      setNotification({
        message: "User harus dipilih!",
        type: "error",
        show: true,
      });
      return;
    }

    // Validasi Tanggal
    const today = new Date().toISOString().split("T")[0];
    if (modalBooking.bookingDate < today) {
      setFormErrors((prev) => ({
        ...prev,
        bookingDate: "Tanggal tidak valid",
      }));
      setNotification({
        message: "Tanggal tidak valid!",
        type: "error",
        show: true,
      });
      return;
    }

    // Validasi duplikasi
    const isDuplicate = bookings.some(
      (booking) =>
        booking.roomId === modalBooking.roomId &&
        booking.bookingDate === modalBooking.bookingDate &&
        booking.id !== modalBooking.id
    );

    if (isDuplicate) {
      setNotification({
        message: "Ruangan sudah dibooking pada tanggal tersebut!",
        type: "error",
        show: true,
      });
      return;
    }

    // Proses simpan/update
    const bookingData: Booking = {
      ...modalBooking,
      price: selectedRoom.price,
    };

    if (isEditMode) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingData.id ? bookingData : b))
      );
      setNotification({
        message: "Data berhasil diupdate!",
        type: "success",
        show: true,
      });
    } else {
      const newId =
        bookings.length > 0
          ? Math.max(...bookings.map((b) => b.id)) + 1
          : 1;
      setBookings((prev) => [...prev, { ...bookingData, id: newId }]);
      setNotification({
        message: "Data berhasil disimpan!",
        type: "success",
        show: true,
      });
    }

    closeModal();
    setModalBooking(initialModalBooking);
  };

  const handleDeleteBooking = (id: number) => {
    setNotification({
      message: "Apakah Anda yakin ingin menghapus data ini?",
      type: "warning",
      show: true,
    });

    // Simpan timeout untuk auto-hide
    const timer = setTimeout(() => {
      setNotification({ message: "", type: "success", show: false });
    }, 5000);

    // Hapus data setelah konfirmasi
    const confirmDelete = () => {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setNotification({
        message: "Data berhasil dihapus!",
        type: "success",
        show: true,
      });
      clearTimeout(timer);
    };

    return () => clearTimeout(timer);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
      {/* Notifikasi */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded shadow-lg transition-opacity duration-300 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : notification.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {notification.message}
          <button
            className="ml-4 text-gray-500 hover:text-gray-700"
            onClick={() => setNotification({ ...notification, show: false })}
          >
            ×
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Daftar Booking
      </h1>
      <div className="min-h-screen bg-gray-100 flex justify-center p-9">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-7xl h-full">
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
                      {new Date(booking.bookingDate).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {getUserName(booking.bookedBy)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(booking.price)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex flex-col space-y-1">
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
                    onChange={(e) => {
                      setModalBooking({
                        ...modalBooking,
                        roomId: Number(e.target.value),
                      });
                      setFormErrors((prev) => ({ ...prev, roomId: "" }));
                    }}
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
                  {formErrors.roomId && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.roomId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    value={modalBooking.bookingDate}
                    onChange={(e) => {
                      setModalBooking({
                        ...modalBooking,
                        bookingDate: e.target.value,
                      });
                      setFormErrors((prev) => ({
                        ...prev,
                        bookingDate: "",
                      }));
                    }}
                    className="w-full border p-2 rounded"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {formErrors.bookingDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.bookingDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Booked By
                  </label>
                  <select
                    value={modalBooking.bookedBy}
                    onChange={(e) => {
                      setModalBooking({
                        ...modalBooking,
                        bookedBy: Number(e.target.value),
                      });
                      setFormErrors((prev) => ({
                        ...prev,
                        bookedBy: "",
                      }));
                    }}
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
                  {formErrors.bookedBy && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.bookedBy}
                    </p>
                  )}
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
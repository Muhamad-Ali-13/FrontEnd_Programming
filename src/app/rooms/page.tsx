"use client";
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import RoomTable from "../../components/RoomTable";
import Pagination from "../../components/Pagination"; // Ensure this path is correct or update it to the correct path
import RoomModal from "../../components/RoomsModal";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const itemsPerPage = 5;

  // Fetch data from API
  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  // Filter data based on search term
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  // Di halaman RoomsPage (pages/rooms/index.tsx)
  const handleSaveRoom = (newRoom: any) => {
    if (selectedRoom) {
      // Update existing room
      fetch(`/api/rooms?id=${selectedRoom.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      }).then(() => {
        setRooms((prev) =>
          prev.map((room) =>
            room.id === selectedRoom.id ? { ...room, ...newRoom } : room
          )
        );
      });
    } else {
      // Create new room
      fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      })
        .then((res) => res.json())
        .then((data) => {
          setRooms([...rooms, data]); // Perbarui state dengan data baru
        });
    }
    setIsModalOpen(false);
  };

  // Approve a room dengan konfirmasi
  const handleApprove = (id: number) => {
    if (window.confirm("Are you sure you want to approve this room?")) {
      fetch(`/api/rooms?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Approved" }),
      })
        .then(() => {
          setRooms((prev) =>
            prev.map((room) =>
              room.id === id ? { ...room, status: "Approved" } : room
            )
          );
        })
        .catch((err) => console.error("Error approving room:", err));
    }
  };

  // Reject a room dengan konfirmasi
  const handleReject = (id: number) => {
    if (window.confirm("Are you sure you want to reject this room?")) {
      fetch(`/api/rooms?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rejected" }),
      })
        .then(() => {
          setRooms((prev) =>
            prev.map((room) =>
              room.id === id ? { ...room, status: "Rejected" } : room
            )
          );
        })
        .catch((err) => console.error("Error rejecting room:", err));
    }
  };

  // Delete a room
  const handleDelete = (id: number) => {
    fetch(`/api/rooms?id=${id}`, { method: "DELETE" }).then(() => {
      setRooms((prev) => prev.filter((room) => room.id !== id));
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">
      Daftar Room
    </h1>

    <div className="p-6">
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Add Button */}
      <button
        onClick={() => {
          setSelectedRoom(null);
          setIsModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Tambah Ruangan
      </button>

      {/* Modal */}
      <RoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveRoom}
        initialData={selectedRoom}
      />

      {/* Table */}
      <RoomTable
        rooms={currentItems}
        onApprove={handleApprove}
        onReject={handleReject}
        onEdit={(room) => {
          setSelectedRoom(room);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <Pagination
        totalItems={filteredRooms.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
    </div>
  );
}

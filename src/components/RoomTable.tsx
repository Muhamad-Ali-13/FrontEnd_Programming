import React from "react";

interface Room {
  id: number;
  name: string;
  capacity: number;
  category: string;
  price: number;
  status: string;
}

interface RoomTableProps {
  rooms: Room[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onEdit: (room: Room) => void;
  onDelete: (id: number) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  onApprove,
  onReject,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-700">
        <tr>
          <th className="py-3 px-4 text-center text-white font-semibold">
            No
          </th>
          <th className="py-3 px-4 text-left text-white font-semibold">
            Name
          </th>
          <th className="py-3 px-4 text-center text-white font-semibold">
            Capacity
          </th>
          <th className="py-3 px-4 text-left text-white font-semibold">
            Category
          </th>
          <th className="py-3 px-4 text-left text-white font-semibold">
            Price
          </th>
          <th className="py-3 px-4 text-center text-white font-semibold">
            Status
          </th>
          <th className="py-3 px-4 text-center text-white font-semibold">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, index) => (
          <tr key={room.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4 text-center border-b">{index + 1}</td>
            <td className="py-3 px-4 border-b">{room.name}</td>
            <td className="py-3 px-4 text-center border-b">{room.capacity}</td>
            <td className="py-3 px-4 border-b">{room.category}</td>
            <td className="py-3 px-4 text-left border-b">
              ${room.price.toLocaleString()}
            </td>
            <td className="py-3 px-4 text-center border-b">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  room.status === "Approved"
                    ? "bg-green-200 text-green-800"
                    : room.status === "Rejected"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {room.status}
              </span>
            </td>
            <td className="py-3 px-4 text-center border-b">
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => onApprove(room.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                  disabled={room.status === "Approved"} // Nonaktifkan jika sudah approved
                >
                  Approve
                </button>
                <button
                  onClick={() => onReject(room.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                  disabled={room.status === "Rejected"} // Nonaktifkan jika sudah rejected
                >
                  Reject
                </button>
                <button
                  onClick={() => onEdit(room)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(room.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomTable;

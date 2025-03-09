import React from 'react';

interface Transaction {
  id: number;
  roomId: number;
  bookingDate: string;
  bookedBy: string;
  price: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
  rooms: any[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  rooms,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-700">
        <tr>
          <th className="py-3 px-4 text-center text-white">No</th>
          <th className="py-3 px-4 text-left text-white">Rooms</th>
          <th className="py-3 px-4 text-left text-white">Booking Date</th>
          <th className="py-3 px-4 text-left text-white">Booking By</th>
          <th className="py-3 px-4 text-right text-white">Price</th>
          <th className="py-3 px-4 text-center text-white">Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => {
          // Cari nama room berdasarkan roomId
          const roomName = rooms.find((room) => room.id === t.roomId)?.name || 'Unknown';
          return (
            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 border-b text-center">{index + 1}</td>
              <td className="py-3 px-4 border-b">{roomName}</td>
              <td className="py-3 px-4 border-b">{t.bookingDate}</td>
              <td className="py-3 px-4 border-b">{t.bookedBy}</td>
              <td className="py-3 px-4 text-right border-b">${t.price.toLocaleString()}</td>
              <td className="py-3 px-4 text-center border-b">
                <button
                  onClick={() => onEdit(t)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionTable;
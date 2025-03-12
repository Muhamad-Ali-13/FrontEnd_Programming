import type { NextApiRequest, NextApiResponse } from 'next';

interface Room {
  id: number;
  name: string;
  capacity: number;
  category: string;
  price: number;
  status: string;
}

// Simpan data di backend (in-memory)
let rooms: Room[] = [
  { id: 1, name: 'Room A', capacity: 10, category: 'Meeting', price: 50, status: 'Draft' },
  { id: 2, name: 'Room B', capacity: 20, category: 'Conference', price: 100, status: 'Approved' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(rooms);
      break;

      case 'POST':
        const newRoom: Room = {
          id: rooms.length + 1,
          ...req.body,
          status: req.body.status || 'Draft', // Default ke 'Pending' jika tidak ada status
        };
        rooms.push(newRoom);
        res.status(201).json(newRoom);
        break;

    case 'PUT':
      const { id } = req.query;
      const updatedRoom = req.body;
      rooms = rooms.map((room) => (room.id === Number(id) ? { ...room, ...updatedRoom } : room));
      res.status(200).json(updatedRoom);
      break;

    case 'DELETE':
      const roomId = Number(req.query.id);
      rooms = rooms.filter((room) => room.id !== roomId);
      res.status(200).json({ message: 'Room deleted successfully' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
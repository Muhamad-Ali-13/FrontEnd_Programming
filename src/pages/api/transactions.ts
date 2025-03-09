import type { NextApiRequest, NextApiResponse } from 'next';

interface Transaction {
  id: number;
  roomId: number;
  bookingDate: string;
  bookedBy: string;
  price: number;
}

let transactions: Transaction[] = [
  {
    id: 1,
    roomId: 1,
    bookingDate: '2024-01-15',
    bookedBy: 'John Doe',
    price: 150,
  },
  {
    id: 2,
    roomId: 2,
    bookingDate: '2024-02-20',
    bookedBy: 'Jane Smith',
    price: 100,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(transactions);
      break;

    case 'POST':
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        ...req.body,
      };
      transactions.push(newTransaction);
      res.status(201).json(newTransaction);
      break;

    case 'PUT':
      const { id } = req.query;
      const updatedTransaction = req.body;
      transactions = transactions.map((t) =>
        t.id === Number(id) ? { ...t, ...updatedTransaction } : t
      );
      res.status(200).json(updatedTransaction);
      break;

    case 'DELETE':
      const transactionId = Number(req.query.id);
      transactions = transactions.filter((t) => t.id !== transactionId);
      res.status(200).json({ message: 'Transaction deleted successfully' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
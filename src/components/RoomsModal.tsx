import React, { useState } from "react";

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const RoomModal: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  // Di dalam RoomModal.tsx
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    capacity: initialData?.capacity || 0,
    category: initialData?.category || "",
    price: initialData?.price || 0,
    status: initialData?.status || "Draft", // Default ke 'Pending' untuk data baru
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Room" : "Add Room"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Meeting">Meeting</option>
              <option value="Conference">Conference</option>
              <option value="Training">Training</option>
            </select>
          </div>
          <div>
            <label className="block">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomModal;

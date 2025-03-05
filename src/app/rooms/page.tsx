// pages/rooms.js
'use client';
import Link from 'next/link';

export default function Rooms() {
  // Data for Room Types
  const roomTypes = [
    {
      id: 1,
      name: 'Standard Room',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$100/night',
      rating: 4,
      description:
        'A cozy and comfortable room with basic amenities, perfect for solo travelers or couples.',
    },
    {
      id: 2,
      name: 'Deluxe Room',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$150/night',
      rating: 5,
      description:
        'A luxurious room with a stunning view, equipped with modern amenities and a spacious layout.',
    },
    {
      id: 3,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      rating: 5,
      description:
        'An exclusive suite with premium furnishings, a private balcony, and access to VIP services.',
    },
    {
      id: 4,
      name: 'Family Room',
      image: 'https://images.unsplash.com/photo-1571008520329-0d5c6d31fa0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$200/night',
      rating: 4,
      description:
        'A spacious room designed for families, featuring multiple beds and a living area.',
    },
    {
      id: 4,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      rating: 5,
      description:
        'An exclusive suite with premium furnishings, a private balcony, and access to VIP services.',
    },
    {
      id: 5,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      rating: 5,
      description:
        'An exclusive suite with premium furnishings, a private balcony, and access to VIP services.',
    },
    {
      id: 6,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      rating: 5,
      description:
        'An exclusive suite with premium furnishings, a private balcony, and access to VIP services.',
    },
    {
      id: 7,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      rating: 5,
      description:
        'An exclusive suite with premium furnishings, a private balcony, and access to VIP services.',
    },
    {
      id: 8,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      rating: 5,
      description:
        'An exclusive suite with premium furnishings, a private balcony, and access to VIP services.',
    },
    {
      id: 9,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      rating: 5,
      description:
        'An exclusive suite with premium furnishings, a private balcony, and access to VIP services.',
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Rooms</h1>

        {/* Room List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomTypes.map((room) => (
            <div key={room.id} className="bg-white p-6 rounded-lg shadow-md">
              {/* Image */}
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {/* Name and Price */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{room.name}</h2>
                <p className="text-indigo-600 font-bold">{room.price}</p>
              </div>
              {/* Rating */}
              <div className="flex items-center mb-2">
                {[...Array(room.rating)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{room.description}</p>
              {/* Book Now Button */}
              <Link href="/book-now">
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
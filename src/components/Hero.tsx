import Link from 'next/link';

  // Data for Recommended Rooms
  const recommendedRooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$150/night',
      class: 'Luxury',
    },
    {
      id: 2,
      name: 'Standard Room',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$100/night',
      class: 'Standard',
    },
    {
      id: 3,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      class: 'Premium',
    },
  ];


export default function Hero() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Selamat Datang di Finwise Hotel</h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Pengalaman akomodasi mewah dengan nuansa abadi di jantung kota.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
            Pesan Sekarang
          </button>
        </div>
        <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
      </section>

      {/* Recommended Rooms Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Kamar Rekomendasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedRooms.map((room) => (
              <div key={room.id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-2">Kategori: {room.class}</p>
                <p className="text-indigo-600 font-bold">{room.price}</p>
                <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
                  Detail Kamar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
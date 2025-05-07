import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    review: "Pengalaman menginap yang luar biasa! Staf sangat ramah dan kamar sangat nyaman.",
    image: "https://randomuser.me/api/portraits/women/75.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    review: "Lokasi strategis dan fasilitas yang sangat lengkap. Pasti akan kembali lagi!",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emma Wilson",
    review: "Restoran mereka menyajikan sarapan terbaik yang pernah saya coba.",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Customer Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Testimoni Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo dan Deskripsi */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Finwise Hotel</h2>
          <p className="text-sm">
            Pengalaman menginap mewah dengan nuansa abadi di jantung kota. Nikmati layanan terbaik kami.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Tautan Cepat</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Beranda</a></li>
            <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-white transition">Kamar</a></li>
            <li><a href="#" className="hover:text-white transition">Fasilitas</a></li>
            <li><a href="#" className="hover:text-white transition">Kontak</a></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-white font-semibold mb-4">Kontak Kami</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2 text-gray-400">📍</span>
              Jl. Pahlawan No. 123, Jakarta
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-gray-400">📞</span>
              +62 812 3456 7890
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-gray-400">✉️</span>
              info@finwisehotel.com
            </li>
          </ul>
        </div>

        {/* Sosial Media & Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FiFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FiInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FiTwitter size={20} />
            </a>
          </div>

          <h3 className="text-white font-semibold mb-2">Berlangganan</h3>
          <p className="text-sm mb-2">Dapatkan promo spesial dan berita terbaru.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email Anda"
              className="bg-gray-800 text-white text-sm px-3 py-2 rounded-l focus:outline-none"
            />
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-r text-sm">
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Finwise Hotel. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
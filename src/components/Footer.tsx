import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
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
export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Selamat Datang di Finwise Hotel</h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Pengalaman akomodasi mewah dengan nuansa abadi di jantung kota.
        </p>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-full transition">
          Pesan Sekarang
        </button>
      </div>
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
    </section>
  );
}
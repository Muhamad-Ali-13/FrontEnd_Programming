import { FiHome, FiCoffee, FiHeart } from 'react-icons/fi';

export default function Features() {
  const features = [
    { icon: <FiHome size={32} />, title: "Kamar Luas", desc: "Kamar modern dengan pemandangan kota yang menakjubkan." },
    { icon: <FiCoffee size={32} />, title: "Restoran 24/7", desc: "Sajian gourmet dan kopi premium tersedia sepanjang hari." },
    { icon: <FiHeart size={32} />, title: "Spa & Kesehatan", desc: "Relaksasi dan perawatan tubuh di pusat spa kami." },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Fasilitas Unggulan</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center">
              <div className="text-gray-700 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function Pricing() {
  const plans = [
    {
      name: "Standar",
      price: "$150",
      features: ["Kamar Deluxe", "Wi-Fi Gratis", "Sarapan Dasar"],
      cta: "Pilih Paket",
      highlight: false,
    },
    {
      name: "Premium",
      price: "$250",
      features: ["Kamar Suite", "Wi-Fi Premium", "Sarapan Lengkap", "Akses Spa"],
      cta: "Paling Populer",
      highlight: true,
    },
    {
      name: "VIP",
      price: "$400",
      features: ["Suite Presiden", "Wi-Fi Prioritas", "Sarapan & Makan Malam", "Spa Full Akses", "Antar-Jemput"],
      cta: "Pesan Sekarang",
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Paket Menginap</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div key={idx} className={`rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 ${plan.highlight ? 'ring-2 ring-gray-700' : ''}`}>
              <div className="bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-gray-800 mb-4">{plan.price}<span className="text-sm text-gray-500">/malam</span></p>
                <ul className="text-gray-600 mb-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-green-500">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full ${plan.highlight ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} font-semibold`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import Image from "next/image";
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaHeart, FaHandHoldingHeart, FaMicrophone } from "react-icons/fa";

// Sponsorship Component
const Sponsorship = () => {
  const sponsors = [
    {
      id: 1,
      logo: "/images/sponsors/company1.png",
      name: "PT. Solusi Muslim",
      description: "Perusahaan teknologi yang berkomitmen mendukung kegiatan keislaman",
      tier: "gold"
    },
    {
      id: 2,
      logo: "/images/sponsors/company2.png", 
      name: "Baitul Maal",
      description: "Lembaga filantropi yang peduli terhadap pendidikan agama",
      tier: "silver"
    },
    {
      id: 3,
      logo: "/images/sponsors/company3.png",
      name: "Muslim Store",
      description: "Toko perlengkapan muslim terpercaya",
      tier: "bronze"
    },
    {
      id: 4,
      logo: "/images/sponsors/company4.png",
      name: "Islamic Finance",
      description: "Layanan keuangan syariah modern",
      tier: "bronze"
    }
  ];

  const tierConfig = {
    gold: { color: "from-yellow-500 to-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    silver: { color: "from-gray-400 to-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
    bronze: { color: "from-amber-700 to-amber-800", bg: "bg-amber-50", border: "border-amber-200" }
  };

  return (
    <section id="sponsorship" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaHandHoldingHeart className="w-4 h-4" />
            <span>Support & Partnership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sponsor & Pendukung
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acara ini terselenggara berkat dukungan dari berbagai pihak yang peduli 
            terhadap dakwah dan pendidikan Islam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {sponsors.map((sponsor) => {
            const tier = tierConfig[sponsor.tier as keyof typeof tierConfig];
            return (
              <div 
                key={sponsor.id}
                className={`${tier.bg} ${tier.border} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2`}
              >
                {/* Sponsor Tier Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${tier.color} mb-4`}>
                  {sponsor.tier.toUpperCase()}
                </div>

                {/* Logo */}
                <div className="bg-white rounded-2xl p-4 mb-4 shadow-inner border">
                  <div className="w-20 h-20 mx-auto bg-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Logo</span>
                    {/* <Image 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    /> */}
                  </div>
                </div>

                {/* Sponsor Info */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{sponsor.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{sponsor.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Become Sponsor CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ingin Menjadi Sponsor?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Dukung acara dakwah ini dan dapatkan berbagai benefit eksklusif untuk brand Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/6289647011970" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FaHandHoldingHeart className="w-5 h-5" />
                <span>Hubungi Admin</span>
              </a>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                Download Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Sponsorship;
import Link from "next/link";
import { 
  FaLightbulb, 
  FaArrowUp, 
  FaUsers, 
  FaHeart,
  FaShieldAlt,
  FaHandsHelping,
  FaQuoteLeft,
  FaStar
} from "react-icons/fa";

const Tentang = ({ center = true }) => {
  return (
    <>
      {/* Tentang */}
      <section id="tentang-acara" className="py-20 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaLightbulb className="w-4 h-4" />
              <span>Mengapa Penting?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mengapa Acara Ini <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Penting?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {"Di tengah arus digital yang deras, kami hadir sebagai jembatan untuk membangun kembali"} 
              {"kepercayaan dan keyakinan generasi muda Muslim terhadap ajaran Islam yang rahmatan lil 'alamin."}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Latar Belakang Card */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-blue-100 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl">
                  <FaUsers className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Latar Belakang</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Di era digital yang penuh dengan informasi beragam, banyak generasi muda Muslim mengalami 
                  <span className="font-semibold text-blue-600"> krisis kepercayaan </span> 
                  terhadap ajaran Islam.
                </p>
                
                <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <FaQuoteLeft className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-blue-800 italic">
                      {`"Banyak yang bertanya: Masih relevankah Islam di zaman modern? 
                      Kajian ini hadir sebagai jawaban dan pencerahan."`}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Kami percaya bahwa setiap keraguan adalah pintu menuju keyakinan yang lebih kuat. 
                  Melalui acara ini, kami ingin membangun jembatan antara logika dan iman.
                </p>
              </div>
            </div>

            {/* Tujuan Kami Card */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-green-100 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-2xl">
                  <FaArrowUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Tujuan Kami</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: FaShieldAlt,
                    title: "Mengembalikan Pemahaman",
                    description: "Islam sebagai solusi komprehensif bagi seluruh aspek kehidupan",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: FaHeart,
                    title: "Memperkuat Aqidah",
                    description: "Membangun keyakinan generasi muda Muslim di Karawang",
                    color: "from-red-500 to-pink-500"
                  },
                  {
                    icon: FaLightbulb,
                    title: "Menjawab Keraguan",
                    description: "Relevansi Islam di zaman modern dengan pendekatan yang mudah dipahami",
                    color: "from-amber-500 to-orange-500"
                  },
                  {
                    icon: FaHandsHelping,
                    title: "Membangun Silaturahmi",
                    description: "Wadah positif untuk berjejaring dan saling mendukung",
                    color: "from-green-500 to-emerald-500"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group/item hover:bg-gray-50 p-3 rounded-2xl transition-all duration-300">
                    <div className={`bg-gradient-to-r ${item.color} p-2 rounded-xl flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <FaStar className="w-4 h-4 text-amber-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "100+", label: "Peserta Target", color: "blue" },
              { number: "4", label: "Jam Materi", color: "green" },
              { number: "5+", label: "Pembicara", color: "purple" },
              { number: "100%", label: "Gratis", color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-white rounded-2xl p-6 shadow-lg border border-${stat.color}-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                  <div className={`text-3xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-400 bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div> */}

          {/* CTA Bottom */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Siap Memperkuat Keyakinan Anda?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Bergabunglah dengan ratusan pemuda Muslim lainnya dalam perjalanan 
                menemukan kembali keindahan Islam yang sebenarnya.
              </p>
              <a 
                href="#detail-acara" 
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaHeart className="w-5 h-5" />
                <span>Daftar Sekarang</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tentang;
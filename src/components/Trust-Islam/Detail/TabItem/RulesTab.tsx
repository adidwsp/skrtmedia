// components/tabs/RulesTab.tsx
import React from 'react';
import { HiAdjustments } from 'react-icons/hi';
<<<<<<< HEAD
import { FaClock, FaHeart, FaHandPeace, FaTrash, FaTshirt, FaPen } from 'react-icons/fa';
=======
import { FaClock, FaHeart, FaHandPeace, FaMobile, FaTshirt, FaPen } from 'react-icons/fa';
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc

const RulesTab: React.FC = () => {
  const rules = [
    {
      icon: FaClock,
      emoji: "🕒",
      title: "Datang Tepat Waktu",
      description: "Hadir 15 menit sebelum acara dimulai untuk registrasi ulang",
      color: "blue"
    },
    {
      icon: FaHeart,
      emoji: "❤️",
<<<<<<< HEAD
      title: "Niat Positif",
      description: "Buka hati untuk inspirasi dan wawasan baru.",
=======
      title: "Luruskan Niat",
      description: "Karena Allah semata, mencari ilmu yang bermanfaat",
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
      color: "red"
    },
    {
      icon: FaHandPeace,
      emoji: "🤫",
      title: "Jaga Ketenangan",
<<<<<<< HEAD
      description: "Jaga ketenangan agar suasana kondusif.",
      color: "green"
    },
    {
      icon: FaTrash,
      emoji: "🚮",
      title: "Jaga Kebersihan",
      description: "Buang sampah pada tempatnya demi kenyamanan lokasi",
=======
      description: "Menjaga suasana kondusif selama majelis ilmu",
      color: "green"
    },
    {
      icon: FaMobile,
      emoji: "📵",
      title: "Non-Aktifkan HP",
      description: "Matikan atau silent mode perangkat mobile",
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
      color: "purple"
    },
    {
      icon: FaTshirt,
      emoji: "👕",
      title: "Berpakaian Sopan",
<<<<<<< HEAD
      description: "Kenakan pakaian yang nyaman, rapi, dan sopan.",
=======
      description: "Menutup aurat dan berpakaian yang pantas",
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
      color: "amber"
    },
    {
      icon: FaPen,
      emoji: "✍️",
      title: "Fokus Menyimak",
      description: "Aktif mendengarkan dan mencatat poin penting",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-50 border-blue-200 text-blue-600",
      red: "bg-red-50 border-red-200 text-red-600",
      green: "bg-green-50 border-green-200 text-green-600",
      purple: "bg-purple-50 border-purple-200 text-purple-600",
      amber: "bg-amber-50 border-amber-200 text-amber-600",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <HiAdjustments className="w-4 h-4" />
          <span>Tata Tertib</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
<<<<<<< HEAD
          Menjaga <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Kenyamanan Bersama</span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Untuk menciptakan suasana yang kondusif, interaktif, dan saling menghargai, ada beberapa etika (adab) yang perlu kita jaga bersama selama acara berlangsung.
=======
          Adab di <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Majelis Ilmu</span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Menjaga adab dalam majelis ilmu adalah bagian dari mengagungkan ilmu dan 
          memuliakan proses belajar. Mari kita jaga bersama-sama.
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((rule, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
          >
            {/* Icon Section */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getColorClasses(rule.color)} group-hover:scale-110 transition-transform duration-300`}>
                <rule.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                {rule.emoji}
              </div>
            </div>

            {/* Content */}
            <h4 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors duration-300">
              {rule.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {rule.description}
            </p>

            {/* Hover Effect Line */}
            <div className="w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500 mt-3"></div>
          </div>
        ))}
      </div>

      {/* Additional Guidelines */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
<<<<<<< HEAD
        <div className=" gap-8 items-center">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiAdjustments className="w-5 h-5 text-green-600" />
              Mengapa Ini Penting?
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Etika bersama ini kami buat bukan untuk mengekang, melainkan untuk menciptakan <span className="italic">{`'Good Vibes, Good Circle' `}</span>
              —lingkungan yang suportif dan positif  bagi semua yang hadir. Saat kita saling menghargai, proses berbagi dan menyerap inspirasi akan jauh lebih bermakna.
            </p>
          </div>
          
          
=======
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiAdjustments className="w-5 h-5 text-green-600" />
              Mengapa Adab Penting?
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rasulullah ﷺ bersabda: <span className="italic">{`"Barangsiapa menempuh jalan untuk mencari ilmu, 
              maka Allah akan memudahkan baginya jalan menuju surga."`}</span> (HR. Muslim)
            </p>
            <p className="text-gray-700 leading-relaxed">
              Menjaga adab dalam majelis ilmu akan membuka pintu keberkahan ilmu 
              dan memudahkan kita untuk memahami serta mengamalkannya.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                1
              </div>
              <div>
                <div className="font-semibold text-gray-900">Mudah Memahami</div>
                <div className="text-sm text-gray-600">Ketenangan membantu konsentrasi</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                2
              </div>
              <div>
                <div className="font-semibold text-gray-900">Keberkahan Ilmu</div>
                <div className="text-sm text-gray-600">Adab yang baik mendatangkan berkah</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                3
              </div>
              <div>
                <div className="font-semibold text-gray-900">Kenyamanan Bersama</div>
                <div className="text-sm text-gray-600">Menghormati hak peserta lain</div>
              </div>
            </div>
          </div>
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
        </div>
      </div>

      {/* Final Reminder */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-sm font-semibold">
          <FaHeart className="w-4 h-4" />
<<<<<<< HEAD
          <span>Mari bersama jaga kenyamanan bersama</span>
=======
          <span>Mari bersama jaga kehormatan majelis ilmu</span>
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
        </div>
      </div>
    </div>
  );
};

export default RulesTab;
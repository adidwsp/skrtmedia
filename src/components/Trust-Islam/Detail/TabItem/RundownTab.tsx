// components/tabs/RundownTab.tsx
import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { FaPray, FaMicrophone, FaBook, FaQuestion, FaHands, FaDoorOpen } from 'react-icons/fa';

const RundownTab: React.FC = () => {
  const events = [
    {
      time: "14:00 - 15:00",
      title: "Registrasi Offline",
      description: "Pendaftaran ulang dan pengecekan tiket",
      icon: FaDoorOpen,
      color: "blue"
    },
    {
      time: "15:00 - 15:30",
      title: "Sholat Ashar",
      description: "Sholat berjamaah bersama",
      icon: FaPray,
      color: "green"
    },
    {
      time: "15:30 - 15:45",
      title: "Pembukaan Oleh MC",
      description: "Sambutan dan pengantar acara",
      icon: FaMicrophone,
      color: "purple"
    },
    {
      time: "15:45 - 15:50",
      title: "Tilawah",
      description: "Pembacaan ayat suci Al-Qur'an",
      icon: FaBook,
      color: "amber"
    },
    {
      time: "15:50 - 16:00",
      title: "Sambutan Ketua Acara",
      description: "Kata sambutan dari panitia",
      icon: FaMicrophone,
      color: "purple"
    },
    {
      time: "16:00 - 17:10",
      title: "Pembedahan Masalah dan Solusi",
      description: "Sesi utama dengan pemateri",
      icon: FaBook,
      color: "blue"
    },
    {
      time: "17:10 - 17:30",
      title: "Q & A Session",
      description: "Tanya jawab dengan pemateri",
      icon: FaQuestion,
      color: "green"
    },
    {
      time: "17:40 - 17:50",
      title: "Muhasabah & Doa",
      description: "Refleksi dan penutup dengan doa",
      icon: FaHands,
      color: "indigo"
    },
    {
      time: "17:50 - 18:00",
      title: "Penutupan",
      description: "Penutupan acara dan informasi lanjutan",
      icon: FaDoorOpen,
      color: "gray"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      amber: "bg-amber-100 text-amber-600 border-amber-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      gray: "bg-gray-100 text-gray-600 border-gray-200"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <MdDashboard className="w-4 h-4" />
          <span>Jadwal Acara</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Rangkaian <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Acara</span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nikmati alur acara yang terstruktur dan penuh makna. Setiap sesi dirancang 
          untuk memberikan pengalaman belajar yang optimal.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2"></div>
          
          {/* Events */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={index} className="relative flex items-start gap-6 group">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 h-12 rounded-xl border-2 ${getColorClasses(event.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <event.icon className="w-5 h-5" />
                  </div>
                  {/* Connecting Line */}
                  {index < events.length - 1 && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group-hover:transform group-hover:-translate-y-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-mono font-bold text-gray-900 text-sm bg-gray-100 px-2 py-1 rounded">
                        {event.time}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getColorClasses(event.color)}`}>
                      {event.title.split(' ')[0]}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>

                  {/* Hover Effect Indicator */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                </div>

                {/* Mobile Time Badge */}
                <div className="sm:hidden absolute -top-2 -right-2">
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {event.time.split(' - ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <MdDashboard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Tips Mengikuti Acara</h4>
              <p className="text-gray-600 text-sm">
                Agar mendapatkan manfaat maksimal, disarankan datang 15 menit lebih awal, 
                membawa alat tulis untuk mencatat, dan mempersiapkan pertanyaan untuk sesi Q&A.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RundownTab;
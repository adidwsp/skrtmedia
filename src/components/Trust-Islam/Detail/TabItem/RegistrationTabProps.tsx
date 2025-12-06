// components/tabs/RegistrationTab.tsx
import React from 'react';
import { HiClipboardList } from 'react-icons/hi';
import { FaCheckCircle, FaGift, FaUsers, FaBookOpen } from 'react-icons/fa';

interface RegistrationTabProps {
  setShowForm: (show: boolean) => void;
}

const RegistrationTab: React.FC<RegistrationTabProps> = ({ setShowForm }) => {
  const steps = [
    {
      number: 1,
      icon: HiClipboardList,
      title: "Isi Formulir",
      description: "Lengkapi data diri melalui tombol Order Tiket"
    },
    {
      number: 2,
      icon: FaGift,
      title: "Berikan Infaq",
      description: "Masukkan nominal infaq terbaik Anda"
    },
    {
      number: 3,
      icon: FaCheckCircle,
      title: "Dapatkan Tiket",
      description: "Simpan nomor tiket untuk konfirmasi"
    }
  ];

  const benefits = [
    {
      icon: FaGift,
      title: "Snack & Makanan",
      description: "Hidangan lezat selama acara"
    },
    {
      icon: FaBookOpen,
      title: "Ilmu Bermanfaat",
      description: "Pengetahuan yang mengubah hidup"
    },
    {
      icon: FaUsers,
      title: "Relasi Baru",
      description: "Jaringan dengan sesama muslim"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <HiClipboardList className="w-4 h-4" />
          <span>Pendaftaran</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Amankan <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Kuota Anda!</span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dapatkan pengalaman belajar yang transformatif dengan mendaftar sekarang. 
          Kuota terbatas hanya untuk 100 peserta.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Steps Section */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <HiClipboardList className="w-5 h-5 text-blue-600" />
            Langkah Registrasi
          </h4>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-4 h-4 text-blue-600" />
                    <h5 className="font-semibold text-gray-900">{step.title}</h5>
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-dashed border-blue-200 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-4 right-4 opacity-10">
            <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-blue-600 mb-3">
                <FaGift className="w-4 h-4" />
                <span>Investasi Ilmu</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                Dengan Infaq Terbaik
              </h4>
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Anda Mendapat
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 mb-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 text-sm">{benefit.title}</h5>
                    <p className="text-gray-600 text-xs">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiClipboardList className="w-5 h-5" />
              <span>Order Tiket Sekarang</span>
            </button>

            {/* Additional Info */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                ⚡ Kuota terbatas 50 Laki-laki & 50 Perempuan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Kuota Tersisa", value: "18%", color: "red" },
          { label: "Total Pendaftar", value: "82", color: "green" },
          { label: "Total Kuota", value: "100", color: "blue" },
          { label: "Waktu Tersisa", value: "0 Hari", color: "purple" }
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationTab;
// components/tabs/LocationTab.tsx
import React from 'react';
import { HiLocationMarker, HiUsers } from 'react-icons/hi';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface LocationTabProps {
  setShowForm: (show: boolean) => void;
}

const LocationTab: React.FC<LocationTabProps> = ({ setShowForm }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <HiLocationMarker className="w-4 h-4" />
          <span>Lokasi & Informasi</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Untuk Siapa Acara Ini?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Acara ini dirancang khusus untuk pemuda-pemudi di Karawang baik dari mahasiswa 
          maupun umum yang mempunyai semangat untuk belajar bersama dan memperbaiki diri.
        </p>
      </div>

      {/* Event Info Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-blue-600 text-white p-4 rounded-2xl">
              <FaCalendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">Minggu, 7 Desember 2025</div>
              <div className="text-gray-600 flex items-center mt-1">
                <FaClock className="w-4 h-4 mr-2" />
                14:00 - 18:00 WIB
              </div>
            </div>
          </div>
          <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold text-lg">
            🎉 Akan Datang
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center border border-blue-200 hover:shadow-lg transition-all duration-300">
          <div className="bg-blue-600 text-white p-3 rounded-2xl inline-flex mb-4">
            <FaCalendar className="w-8 h-8" />
          </div>
          <p className="font-bold text-lg text-gray-900 mb-2">Waktu Acara</p>
          <p className="text-gray-600 mb-1">Minggu, 7 Des 2025</p>
          <p className="text-sm text-gray-500">14:00 - 18:00 WIB</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-200 hover:shadow-lg transition-all duration-300">
          <div className="bg-green-600 text-white p-3 rounded-2xl inline-flex mb-4">
            <HiUsers className="w-8 h-8" />
          </div>
          <p className="font-bold text-lg text-gray-900 mb-2">Target Peserta</p>
          <p className="text-gray-600">50 Laki-laki & 50 Perempuan</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-200 hover:shadow-lg transition-all duration-300">
          <div className="bg-purple-600 text-white p-3 rounded-2xl inline-flex mb-4">
            <FaMapMarkerAlt className="w-8 h-8" />
          </div>
          <p className="font-bold text-lg text-gray-900 mb-2">Lokasi Acara</p>
          <p className="text-gray-600">Waroeng Desa (Wardes)</p>
          <p className="text-sm text-gray-500">Karawang</p>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <div className="w-full h-64 md:h-96">
          <iframe 
            title="Lokasi Warung Desa Karawang" 
            src="https://www.google.com/maps?q=Warung+Desa+Karawang&output=embed" 
            className="w-full h-full border-0" 
            allowFullScreen 
            loading="lazy" 
          />
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
<<<<<<< HEAD
            📍 Waroeng Desa (Wardes), Karawang - Tempat yang nyaman untuk belajar dan silaturahmi
=======
            📍 Warung Desa (Wardes), Karawang - Tempat yang nyaman untuk belajar dan silaturahmi
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center"
      >
        <button 
          onClick={() => setShowForm(true)} 
<<<<<<< HEAD
          className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
=======
          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
        >
          <HiLocationMarker className="w-5 h-5" />
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
};

export default LocationTab;
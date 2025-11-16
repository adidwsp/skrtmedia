// components/ContactFooter.tsx
import React from 'react';
import Link from 'next/link';
import { FaUser, FaUserFriends, FaWhatsapp, FaTicketAlt } from 'react-icons/fa';
import { MALE_CONTACT, FEMALE_CONTACT } from '@/components/Trust-Islam/types/form';

const ContactFooter: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Kontak Admin */}
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Butuh Bantuan?</h2>
          <p className="text-gray-600 max-w-md">
            Hubungi admin kami yang siap membantu Anda dengan senang hati.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Admin Laki-laki */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaUser className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Admin Laki-laki</h3>
                <p className="text-sm text-gray-500">Siap membantu</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${MALE_CONTACT}`}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="flex items-center justify-center text-xs xs:text-sm sm:text-md lg:text-md gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
=======
              className="flex items-center justify-center text-xs xs:text-sm sm:text-md lg:text-lg gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
            >
              <FaWhatsapp className="w-5 h-5" />
              Hubungi via WhatsApp
            </a>
          </div>

          {/* Admin Perempuan */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-pink-100 p-3 rounded-xl">
                <FaUserFriends className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Admin Perempuan</h3>
                <p className="text-sm text-gray-500">Siap membantu</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${FEMALE_CONTACT}`}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="flex items-center text-xs xs:text-sm sm:text-md lg:text-md justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
=======
              className="flex items-center text-xs xs:text-sm sm:text-md lg:text-lg justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
>>>>>>> f00b6075a64eec3f66e9b4ffd7eeef638b9a40dc
            >
              <FaWhatsapp className="w-5 h-5" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Pencarian Tiket */}
      <div className="flex flex-col justify-center">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <div className="bg-white/20 p-3 rounded-2xl mb-4">
              <FaTicketAlt className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Sudah Mendaftar?</h3>
            <p className="text-blue-100 mb-6 max-w-sm">
              Cek status pendaftaran dan informasi tiket Anda dengan mudah.
            </p>
            <Link
              href="/trust-islam/ticket"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <FaTicketAlt className="w-5 h-5" />
              Cek Tiket Saya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFooter;
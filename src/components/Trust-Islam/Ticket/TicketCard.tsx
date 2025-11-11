// components/TicketCard.tsx
"use client";


import React, { useState } from 'react';
import { FiCalendar, FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';
import { Ticket } from '@/components/Trust-Islam/Ticket/types/ticket';

// --- Komponen Modal ---
// Anda perlu membuat komponen Modal sederhana, anggap saja namanya TicketModal
const TicketModal: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClose: () => void }> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Komponen Kartu Tiket ---
export interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const statusColor = ticket.isUsed ? 'bg-red-500' : 'bg-green-500';
  const statusText = ticket.isUsed ? 'Sudah Digunakan' : 'Aktif';

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto my-8 border border-gray-100 transition duration-300 hover:shadow-2xl">
      
      {/* Header Tiket */}
      <div className={`p-4 text-white ${statusColor} flex justify-between items-center`}>
        <h2 className="text-2xl font-extrabold truncate">{ticket.eventName}</h2>
        <span className="text-sm font-semibold p-1.5 rounded-full bg-black bg-opacity-20">{statusText}</span>
      </div>

      {/* Detail Ringkas Tiket */}
      <div className="p-6 space-y-3">
        {/* Tanggal & Waktu */}
        <div className="flex items-center text-gray-600">
          <FiCalendar className="w-5 h-5 text-indigo-500 mr-3" />
          <span className="font-semibold">{ticket.date}</span>
          <FiClock className="w-5 h-5 text-indigo-500 ml-4 mr-3" />
          <span className="font-semibold">{ticket.time}</span>
        </div>
        
        {/* Lokasi */}
        <div className="flex items-center text-gray-600">
          <FiMapPin className="w-5 h-5 text-indigo-500 mr-3" />
          <span className="truncate">{ticket.location}</span>
        </div>
        
        {/* Tipe Tiket */}
        <div className="flex items-center text-gray-600">
          {ticket.isUsed ? <FiXCircle className="w-5 h-5 text-red-500 mr-3" /> : <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />}
          <span className="font-bold text-lg text-indigo-600">{ticket.ticketType}</span>
        </div>
      </div>

      {/* Area Tombol */}
      <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3 border-t border-dashed border-gray-300">
        
        {/* Tombol Tampilkan QR */}
        <button
          onClick={() => setShowQrModal(true)}
          className="flex-1 flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-indigo-700 transition duration-150"
        >
          <FiXCircle className="w-5 h-5 mr-2" />
          Tampilkan QR
        </button>
        
        {/* Tombol Tampilkan Detail */}
        <button
          onClick={() => setShowDetailModal(true)}
          className="flex-1 flex items-center justify-center bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-gray-300 transition duration-150"
        >
          <FiInfo className="w-5 h-5 mr-2" />
          Detail Tiket
        </button>
      </div>

      {/* --- Modal QR Code --- */}
      <TicketModal
        title="QR Code Tiket"
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Ganti dengan komponen QR Code yang sebenarnya */}
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center border border-gray-300 rounded-lg">
            {/*  */}
            <span className="text-xs text-gray-500">QR Code Event {ticket.id}</span>
          </div>
          <p className="text-sm text-center text-gray-600">
            Tunjukkan kode ini saat masuk. Jangan bagikan kepada siapapun.
          </p>
        </div>
      </TicketModal>

      {/* --- Modal Detail Tiket --- */}
      <TicketModal
        title="Detail Tiket"
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      >
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">ID Tiket:</span>
            <span className="text-right">{ticket.id}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Harga:</span>
            <span className="text-right">Rp {ticket.price.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Status:</span>
            <span className={`font-bold ${ticket.isUsed ? 'text-red-600' : 'text-green-600'}`}>{statusText}</span>
          </div>
          <div className="pt-2 text-xs text-gray-500">
            Detail lengkap event seperti peraturan dan informasi kontak bisa ditambahkan di sini.
          </div>
        </div>
      </TicketModal>
    </div>
  );
};

export default TicketCard;
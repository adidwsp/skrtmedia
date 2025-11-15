// components/Trust-Islam/Ticket/TicketCard.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  FiCalendar, 
  FiMapPin, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiInfo,
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiShare2,
  FiDownload,
  FiEye
} from "react-icons/fi";
import { 
  FaWhatsapp, 
  FaCopy, 
  FaQrcode,
  FaTicketAlt 
} from "react-icons/fa";
import { Ticket } from "@/components/Trust-Islam/Ticket/types/ticket";

/**
 * Modal elegan dengan backdrop blur
 */
const TicketModal: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}> = ({ title, children, isOpen, onClose, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop dengan blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-3xl w-full ${sizeClasses[size]} shadow-2xl transform transition-all duration-300 scale-100`}>
        {/* Header dengan gradient */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-t-3xl p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface TicketCardProps {
  ticket: Ticket & {
    purchaserName?: string;
    name?: string;
    email?: string;
    phone?: string;
    donation_amount?: number;
    donation_bank?: string;
    created_at?: string;
  };
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const statusConfig = {
    used: {
      color: "bg-gradient-to-r from-red-500 to-red-600",
      text: "Sudah Digunakan",
      icon: FiXCircle,
      badgeColor: "bg-red-100 text-red-800"
    },
    active: {
      color: "bg-gradient-to-r from-green-500 to-green-600",
      text: "Aktif & Valid",
      icon: FiCheckCircle,
      badgeColor: "bg-green-100 text-green-800"
    }
  };

  const status = ticket.isUsed ? statusConfig.used : statusConfig.active;
  const StatusIcon = status.icon;

  const confirmationUrl = useMemo(() => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      return origin ? `${ticket.id}` : `${ticket.id}`;
    } catch {
      return `${ticket.id}`;
    }
  }, [ticket.id]);

  const qrImageSrc = useMemo(() => {
    const data = encodeURIComponent(confirmationUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${data}&format=png&margin=10&color=0F172A&bgcolor=F8FAFC`;
  }, [confirmationUrl]);

  const purchaser = (ticket.purchaserName || ticket.name || (ticket as any).nama) ?? null;
  const email = ticket.email ?? null;
  const phone = ticket.phone ?? null;
  const donation = typeof (ticket.donation_amount ?? (ticket.price ?? undefined)) === "number" ? (ticket.donation_amount ?? ticket.price) : undefined;
  const donationBank = ticket.donation_bank ?? undefined;
  const createdAt = ticket.created_at ? new Date(ticket.created_at).toLocaleString("id-ID") : undefined;
  const eventDate = ticket.date ? new Date(ticket.date) : undefined;
  
  const formattedDate = eventDate?.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formattedTime = eventDate?.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareTicket = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tiket ${ticket.eventName}`,
          text: `Tiket saya untuk acara ${ticket.eventName}`,
          url: confirmationUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard(confirmationUrl);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrImageSrc;
    link.download = `ticket-${ticket.id}.png`;
    link.click();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto my-8 border border-gray-100 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
      {/* Header dengan Gradient */}
      <div className={`p-8 text-white ${status.color} relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2 leading-tight">{ticket.eventName}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.badgeColor}`}>
                  <StatusIcon className="w-4 h-4 inline mr-1" />
                  {status.text}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {ticket.ticketType}
                </span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <FaTicketAlt className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-8 space-y-6">
        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-blue-600 font-medium">Tanggal</div>
              <div className="font-semibold text-gray-900">{formattedDate}</div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-purple-50 rounded-2xl border border-purple-100">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <FiClock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-purple-600 font-medium">Waktu</div>
              <div className="font-semibold text-gray-900">{formattedTime} WIB</div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center p-4 bg-green-50 rounded-2xl border border-green-100">
          <div className="bg-green-100 p-3 rounded-xl mr-4">
            <FiMapPin className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-green-600 font-medium">Lokasi</div>
            <a 
              href="https://maps.app.goo.gl/EosPh2yzaz3VK4fp8" 
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Waroeng Desa (Wardes)
            </a>
          </div>
        </div>

        {/* Ticket ID & Actions */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600 font-medium">Nomor Tiket</div>
              <div className="font-mono font-bold text-lg text-gray-900">{ticket.id}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(ticket.id)}
                className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors tooltip"
                title="Salin nomor tiket"
              >
                <FaCopy className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={shareTicket}
                className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                title="Bagikan tiket"
              >
                <FiShare2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          {copied && (
            <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-lg text-sm text-center">
              ✓ Nomor tiket disalin!
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-8 pt-0">
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <FaQrcode className="w-6 h-6" />
            Tampilkan QR Code
          </button>

          <button
            onClick={() => setShowDetailModal(true)}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <FiEye className="w-6 h-6" />
            Lihat Detail Lengkap
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      <TicketModal 
        title="QR Code Tiket" 
        isOpen={showQrModal} 
        onClose={() => setShowQrModal(false)}
        size="lg"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* QR Code Display */}
          <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-blue-200 shadow-inner">
            <div className="rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image 
                src={qrImageSrc} 
                alt={`QR Code untuk ${ticket.id}`} 
                width={280} 
                height={280}
                className="w-full h-auto"
                unoptimized 
              />
            </div>
          </div>

          {/* Ticket Info */}
          <div className="text-center space-y-2">
            <div className="font-mono font-bold text-xl text-gray-900 bg-gray-100 px-4 py-2 rounded-lg">
              {ticket.id}
            </div>
            <p className="text-gray-600 text-sm">
              Pindai QR code ini untuk verifikasi tiket
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={downloadQR}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
            >
              <FiDownload className="w-5 h-5" />
              Download QR
            </button>
            <a
              href={`/trust-islam/tickets/${encodeURIComponent(ticket.id)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-medium transition-colors text-center"
            >
              <FiEye className="w-5 h-5" />
              Buka Halaman
            </a>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-800 text-sm font-medium">
              <FiInfo className="w-4 h-4" />
              Jangan bagikan QR code ini kepada orang lain
            </div>
          </div>
        </div>
      </TicketModal>

      {/* Detail Modal */}
      <TicketModal 
        title="Detail Tiket Lengkap" 
        isOpen={showDetailModal} 
        onClose={() => setShowDetailModal(false)}
        size="lg"
      >
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5 text-blue-600" />
              Informasi Peserta
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {purchaser && (
                <div>
                  <div className="text-sm text-gray-600 font-medium">Nama Lengkap</div>
                  <div className="font-semibold text-gray-900 text-lg">{purchaser}</div>
                </div>
              )}
              {/* {email && (
                <div>
                  <div className="text-sm text-gray-600 font-medium">Email</div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-gray-400" />
                    {email}
                  </div>
                </div>
              )}
              {phone && (
                <div>
                  <div className="text-sm text-gray-600 font-medium">Nomor Telepon</div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    <FiPhone className="w-4 h-4 text-gray-400" />
                    {phone}
                  </div>
                </div>
              )} */}
            </div>
          </div>

          {/* Ticket Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <FaTicketAlt className="w-5 h-5 text-green-600" />
              Informasi Tiket
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 font-medium">Nomor Tiket</div>
                <div className="font-mono font-bold text-gray-900">{ticket.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 font-medium">Tipe Tiket</div>
                <div className="font-semibold text-gray-900">{ticket.ticketType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 font-medium">Status</div>
                <div className={`font-bold ${ticket.isUsed ? "text-red-600" : "text-green-600"}`}>
                  {status.text}
                </div>
              </div>
              {createdAt && (
                <div>
                  <div className="text-sm text-gray-600 font-medium">Dibuat Pada</div>
                  <div className="font-semibold text-gray-900">{createdAt}</div>
                </div>
              )}
            </div>
          </div>

          {/* Donation Information */}
          {(donation || donationBank) && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <FiDollarSign className="w-5 h-5 text-purple-600" />
                Informasi Infaq
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {donation !== undefined && (
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Nominal Infaq</div>
                    <div className="font-bold text-2xl text-purple-600">
                      Rp {Number(donation).toLocaleString("id-ID")}
                    </div>
                  </div>
                )}
                {donationBank && (
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Bank Transfer</div>
                    <div className="font-semibold text-gray-900">{donationBank}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <FiInfo className="w-5 h-5 text-amber-600" />
              Butuh Bantuan?
            </h4>
            <p className="text-gray-700 mb-4">
              Jika ada kesalahan data atau pertanyaan tentang tiket ini, silakan hubungi admin kami.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/6289647011970"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Admin Laki-laki
              </a>
              <a
                href="https://wa.me/6281210736312"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Admin Perempuan
              </a>
            </div>
          </div>
        </div>
      </TicketModal>
    </div>
  );
};

export default TicketCard;
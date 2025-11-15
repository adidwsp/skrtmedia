// components/Trust-Islam/Ticket/TicketCard.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FiCalendar, FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";
import { Ticket } from "@/components/Trust-Islam/Ticket/types/ticket";

/**
 * Modal sederhana (client) - dipakai untuk QR & Detail
 */
const TicketModal: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClose: () => void }> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-6">{children}</div>
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

  const statusColor = ticket.isUsed ? "bg-red-500" : "bg-green-500";
  const statusText = ticket.isUsed ? "Sudah Digunakan" : "Aktif";

  const confirmationUrl = useMemo(() => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      return origin ? `${(ticket.id)}` : `${(ticket.id)}`;
    } catch {
      return `${(ticket.id)}`;
    }
  }, [ticket.id]);

  const qrImageSrc = useMemo(() => {
    const data = encodeURIComponent(confirmationUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${data}`;
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

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto my-8 border border-gray-100 transition duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className={`p-4 text-white ${statusColor} flex justify-between items-center`}>
        <h2 className="text-2xl font-extrabold truncate">{ticket.eventName}</h2>
        <span className="text-sm font-semibold p-1.5 rounded-full bg-black bg-opacity-20">{statusText}</span>
      </div>

      {/* Summary */}
      <div className="p-6 space-y-3">
        <div className="flex items-center text-gray-600">
          <FiCalendar className="w-5 h-5 text-indigo-500 mr-3" />
          <span className="font-semibold">{formattedDate}</span>
          <FiClock className="w-5 h-5 text-indigo-500 ml-4 mr-3" />
          <span className="font-semibold">{formattedTime} WIB</span>
        </div>

        <div className="flex items-center text-gray-600">
          <FiMapPin className="w-5 h-5 text-indigo-500 mr-3" />
          <a href="https://maps.app.goo.gl/EosPh2yzaz3VK4fp8" className="truncate text-blue-600 hover:underline" target="_blank">Waroeng Desa (Wardes)</a>
        </div>

        <div className="flex items-center text-gray-600">
          {ticket.isUsed ? <FiXCircle className="w-5 h-5 text-red-500 mr-3" /> : <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />}
          <span className="font-bold text-lg text-indigo-600">{ticket.ticketType}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3 border-t border-dashed border-gray-300">
        <button
          onClick={() => setShowQrModal(true)}
          className="flex-1 flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-indigo-700 transition duration-150"
        >
          <FiInfo className="w-5 h-5 mr-2" />
          Tampilkan QR
        </button>

        <button
          onClick={() => setShowDetailModal(true)}
          className="flex-1 flex items-center justify-center bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-gray-300 transition duration-150"
        >
          <FiInfo className="w-5 h-5 mr-2" />
          Detail Tiket
        </button>
      </div>

      {/* QR Modal (gunakan next/image dengan unoptimized untuk menghindari konfigurasi domain) */}
      <TicketModal title="QR Code Tiket" isOpen={showQrModal} onClose={() => setShowQrModal(false)}>
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <Image src={qrImageSrc} alt={`QR for ${ticket.id}`} width={300} height={300} unoptimized />
          </div>

          <div className="text-sm text-center text-gray-600">Pindai kode ini untuk membuka halaman konfirmasi tiket.</div>

          <div className="flex gap-2">
            <a href={qrImageSrc} target="_blank" rel="noreferrer" className="px-3 py-2 rounded border">Buka Gambar QR</a>
            <a href={`/tickets/${encodeURIComponent(ticket.id)}`} className="px-3 py-2 rounded bg-[#0EA5E9] text-white">Buka Halaman Konfirmasi</a>
          </div>

          <div className="text-xs text-gray-500">Jangan bagikan QR ini kepada orang lain.</div>
        </div>
      </TicketModal>

      {/* Detail Modal */}
      <TicketModal title="Detail Tiket" isOpen={showDetailModal} onClose={() => setShowDetailModal(false)}>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">ID Tiket:</span>
            <span className="text-right">{ticket.id}</span>
          </div>

          {purchaser && (
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Pemesan:</span>
              <span className="text-right">{purchaser}</span>
            </div>
          )}

          {email && (
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Email:</span>
              <span className="text-right">{email}</span>
            </div>
          )}

          {phone && (
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Telepon:</span>
              <span className="text-right">{phone}</span>
            </div>
          )}

          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Tipe Tiket:</span>
            <span className="text-right">{ticket.ticketType}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Infaq:</span>
            <span className="text-right">Rp {Number(donation ?? 0).toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Status:</span>
            <span className={`font-bold ${ticket.isUsed ? "text-red-600" : "text-green-600"}`}>{statusText}</span>
          </div>

          {donationBank && (
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Bank:</span>
              <span className="text-right">{donationBank}</span>
            </div>
          )}

          {createdAt && (
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Dibuat pada:</span>
              <span className="text-right">{createdAt}</span>
            </div>
          )}

          <div className="pt-2 text-xs text-gray-500">Jika ada kesalahan data, hubungi admin untuk perbaikan.</div>
        </div>
      </TicketModal>
    </div>
  );
};

export default TicketCard;

// components/Trust-Islam/Ticket/index.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaSearch, FaTicketAlt, FaArrowLeft, FaWhatsapp, FaCopy, FaBars } from "react-icons/fa";
import TicketCard from "@/components/Trust-Islam/Ticket/TicketCard";
import { createClient } from "@/utils/supabase/client";
import Footer from "@/components/Trust-Islam/Footer";
import Header from "@/components/Trust-Islam/Header";

const supabase = createClient();

type DBTicketRow = any;

const TicketsPage: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [ticketRow, setTicketRow] = useState<DBTicketRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type?: "info" | "success" | "error" } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Data kontak admin
  const adminContacts = {
    male: {
      name: "Admin Laki-laki",
      phone: "6289647011970",
      waLink: "https://wa.me/6289647011970"
    },
    female: {
      name: "Admin Perempuan", 
      phone: "6281210736312",
      waLink: "https://wa.me/6281210736312"
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => showToast("Nomor tiket disalin!", "success"))
      .catch(() => showToast("Gagal menyalin", "error"));
  };

  async function searchTicketByNumber(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) {
      setError("Masukkan nomor tiket untuk mencari.");
      setTicketRow(null);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setError(null);
    setTicketRow(null);
    setNotFound(false);

    try {
      const res = await supabase
        .from("tickets")
        .select("*, events(*)")
        .ilike("ticket_number", q)
        .maybeSingle();

      if (res.error) {
        console.error("Supabase error:", res.error);
        setError("Terjadi kesalahan saat mengambil data. Silakan coba lagi.");
        return;
      }

      const row = res.data;
      if (!row) {
        setNotFound(true);
        return;
      }

      setTicketRow(row);
      showToast("Tiket ditemukan!", "success");
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Terjadi kesalahan tak terduga. Silakan hubungi admin.");
    } finally {
      setLoading(false);
    }
  }

  function mapRowToTicket(row: DBTicketRow) {
    const ev = row.events ?? null;
    const ticket = {
      id: row.ticket_number ?? String(row.id ?? "UNKNOWN"),
      eventName: ev?.name ?? ev?.title ?? "Trust Islam",
      date: ev?.date ?? (row.created_at ? new Date(row.created_at).toISOString() : ""),
      time: ev?.time ?? ev?.event_time ?? "—",
      location: ev?.description ?? "—",
      ticketType: row.ticket_type ?? "General",
      price: typeof row.donation_amount === "number" ? row.donation_amount : row.price ?? 0,
      qrCodeUrl: row.qr_code_url ?? `/api/qrcode/${row.ticket_number ?? (row.id ?? "")}`,
      isUsed: !!row.is_used,
      purchaserName: row.name ?? row.nama ?? "",
      email: row.email ?? "",
      phone: row.phone ?? "",
      donation_amount: typeof row.donation_amount === "number" ? row.donation_amount : row.price ?? 0,
      donation_bank: row.donation_bank ?? "",
      created_at: row.created_at ?? "",
    };
    return ticket;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-3 py-4 sm:px-6 sm:py-8">
        <div className="mt-24 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-6 sm:mb-12">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg border border-blue-100">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaTicketAlt className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">Cek Tiket Anda</h1>
              <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Masukkan nomor tiket untuk melihat detail lengkap pendaftaran Anda. 
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-6 mb-4 sm:mb-8">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={searchTicketByNumber} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="ticket-search" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Nomor Tiket
                  </label>
                  <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                    <input
                      id="ticket-search"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Contoh: T-1a2b3c4d"
                      className="flex-1 px-3 py-3 sm:px-4 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg placeholder-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-4 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 ${
                        loading 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : "bg-blue-400  hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm sm:text-base">Mencari...</span>
                        </>
                      ) : (
                        <>
                          <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-sm sm:text-base">Cari Tiket</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                    Masukkan nomor tiket yang Anda terima setelah pendaftaran
                  </p>
                </div>
              </form>

              {/* Error & Status Messages */}
              {error && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {notFound && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl text-amber-700 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Tiket tidak ditemukan. Periksa kembali nomor tiket Anda.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          {ticketRow ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Tiket Ditemukan!</h2>
                    <p className="text-green-100 text-sm sm:text-base">Berikut detail tiket Anda</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-white/20 px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                      <div className="font-mono font-bold text-sm sm:text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] xs:max-w-[150px] sm:max-w-none">
                        {ticketRow.ticket_number}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(ticketRow.ticket_number)}
                      className="bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors flex-shrink-0"
                      title="Salin nomor tiket"
                    >
                      <FaCopy className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <TicketCard ticket={mapRowToTicket(ticketRow)} />
            </div>
          ) : (
            !loading && !error && !notFound && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <FaSearch className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-3">Cari Tiket Anda</h3>
                  <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    Masukkan nomor tiket di kolom pencarian untuk menampilkan detail tiket Anda.
                  </p>
                  
                  {/* Quick Help */}
                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 text-sm sm:text-base mb-1 sm:mb-2">Tidak menemukan tiket?</h4>
                    <p className="text-blue-700 text-xs sm:text-sm mb-2 sm:mb-3">
                      Pastikan nomor tiket sudah benar. Jika masih mengalami masalah, hubungi admin kami.
                    </p>
                    <div className="flex flex-col xs:flex-row gap-2 justify-center">
                      <a
                        href={adminContacts.male.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                      >
                        <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4" />
                        Admin Laki-laki
                      </a>
                      <a
                        href={adminContacts.female.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                      >
                        <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4" />
                        Admin Perempuan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-[99999] px-4 py-3 sm:px-6 sm:py-4 rounded-lg sm:rounded-xl shadow-lg transform transition-all duration-300 ${
          toast.type === "success" ? "bg-green-600" : 
          toast.type === "error" ? "bg-red-600" : "bg-blue-600"
        } text-white`}>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium flex-1 text-center sm:text-left">{toast.message}</div>
            <button 
              className="text-white/80 hover:text-white transition-colors flex-shrink-0" 
              onClick={() => setToast(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
"use client";

import React, { useState } from "react";
import TicketCard from "@/components/Trust-Islam/Ticket/TicketCard"; // adjust if path berbeda
import { createClient } from "src/utils/supabase/client";

const supabase = createClient();

type DBTicketRow = any;

const TicketsPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [ticketRow, setTicketRow] = useState<DBTicketRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type?: "info" | "success" | "error" } | null>(null);

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
      // CASE-INSENSITIVE search menggunakan ilike
      // SELECT tiket + related event row (relation name assumed 'events')
      const res = await supabase
        .from("tickets")
        .select("*, events(*)") // ganti 'events' jika nama relation berbeda di DB
        .ilike("ticket_number", q) // case-insensitive exact-ish match; you can also use .eq if exact-case match desired
        .maybeSingle();

      if (res.error) {
        console.error("Supabase error:", res.error);
        setError("Terjadi kesalahan saat mengambil data. Cek console.");
        return;
      }

      const row = res.data;
      if (!row) {
        setNotFound(true);
        return;
      }

      setTicketRow(row);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Terjadi kesalahan tak terduga. Cek console.");
    } finally {
      setLoading(false);
    }
  }

  function mapRowToTicket(row: DBTicketRow) {
    // row = tiket row. Related event (if any) available at row.events (because of select('*, events(*)'))
    const ev = row.events ?? null; // null if not joined / missing
    const ticket = {
      id: row.ticket_number ?? (row.id ? String(row.id) : "UNKNOWN"),
      eventName: ev?.name ?? ev?.title ?? "Trust Islam",
      date: ev?.date ?? (row.created_at ? new Date(row.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "—"),
      time: ev?.time ?? ev?.event_time ?? "—",
      location: ev?.description ?? "—",
      ticketType: row.ticket_type ?? "General",
      price: typeof row.donation_amount === "number" ? row.donation_amount : row.price ?? 0,
      qrCodeUrl: row.qr_code_url ?? `/api/qrcode/${row.ticket_number ?? (row.id ?? "")}`,
      isUsed: !!row.is_used,
    };
    return ticket;
  }

  function copyTicketNumber() {
    if (!ticketRow) return;
    const value = ticketRow.ticket_number ?? (ticketRow.id ? String(ticketRow.id) : "");
    navigator.clipboard?.writeText(value)
      .then(() => setToast({ message: "Nomor tiket disalin", type: "success" }))
      .catch(() => setToast({ message: "Gagal menyalin", type: "error" }));
  }

  return (
    <section
      id="beranda"
      className="min-h-screen flex items-start bg-cover bg-center pt-16 pb-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(247,251,255,0.85), rgba(247,251,255,1)), url('https://placehold.co/1920x1080/E6F9FF/0B6E99?text=SKRT+MEDIA')",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">Tiket Saya</h1>
            <p className="text-sm text-gray-500">Cari tiket dengan memasukkan nomor tiket di bawah (tanpa login).</p>
          </header>

          <form onSubmit={searchTicketByNumber} className="flex gap-3 items-center mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Masukkan nomor tiket (contoh: T-1a2b3c4d)"
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-3 rounded-lg text-white font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0EA5E9] hover:bg-[#0ca6dc]"}`}
            >
              {loading ? "Mencari..." : "Cari"}
            </button>
          </form>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
          {notFound && <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded">Tiket tidak ditemukan. Periksa kembali nomor tiket Anda.</div>}

          {ticketRow ? (
            <div className="space-y-4">
              <div className="flex justify-end gap-2 mb-2">
                
              </div>

              <TicketCard ticket={mapRowToTicket(ticketRow)} />
            </div>
          ) : (
            <div className="p-6 bg-white rounded-lg shadow border">
              <p className="text-sm text-gray-600">Masukkan nomor tiket untuk menampilkan detail tiketmu.</p>
            </div>
          )}

          <div className="mt-6 max-w-xl mx-auto text-sm text-gray-500">
            <p>Jika kamu tidak menemukan tiket, pastikan nomor tiket sudah benar atau hubungi admin.</p>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`fixed top-6 right-6 z-[99999] ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-blue-600"} text-white px-4 py-2 rounded-lg shadow-lg`}>
          <div className="flex items-center gap-4">
            <div className="text-sm">{toast.message}</div>
            <button className="text-white/80" onClick={() => setToast(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TicketsPage;

// app/tickets/[ticket]/page.tsx
import React from "react";
import TicketCard from "@/components/Trust-Islam/Ticket/TicketCard"; // adjust path jika perlu
import { createClient } from "@/utils/supabase/server"; // util server (pakai service role key)
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import TicketActionsClient from "@/components/Trust-Islam/Ticket/TicketActionsClient"; // client component untuk tombol interaktif
import { FaWhatsapp } from "react-icons/fa";


type Props = {
  params: { ticket: string };
};

const MALE_CONTACT = "6289647011970";        // kamu / kontak laki-laki
const FEMALE_CONTACT = "6281210736312";      // admin perempuan
const MALE_GROUP_LINK = "https://chat.whatsapp.com/JLte0VN7DJfLGnJvR1IVbL";
const FEMALE_GROUP_LINK = "https://chat.whatsapp.com/HJ4gFRLlAKjGRNNxOPPcLj";
const BANK_INFO = {
  bank: "Bank Jago",
  accountName: "Adi Dwi Saputra",
  accountNumber: "506693547160",
};

export default async function TicketConfirmationPage({ params }: Props) {
  const ticketNumber = params.ticket;

  // buat supabase server client; util harus memakai SERVICE_ROLE_KEY (server-only env)
  const supabase = await createClient(cookies());

  // Ambil tiket + event (jika relasi events ada). Ganti select jika nama relation berbeda.
  const { data: ticketRow, error } = await supabase
    .from("tickets")
    .select("*, events(*)")
    .eq("ticket_number", ticketNumber)
    .maybeSingle();

  if (error) {
    console.error("Supabase fetch error:", error);
    // fallback: tampilkan not found agar tidak bocor detail error
    return notFound();
  }

  if (!ticketRow) {
    return notFound();
  }

  // mapping ke shape TicketCard butuh
  const ev = ticketRow.events ?? null;
  const ticket = {
    id: ticketRow.ticket_number ?? String(ticketRow.id ?? ticketNumber),
    eventName: ev?.name ?? ev?.event_name ?? "Trust Islam",
    date: ev?.date ?? ev?.event_date ?? (ticketRow.created_at ? new Date(ticketRow.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "—"),
    time: ev?.time ?? ev?.event_time ?? "—",
    location: ev?.location ?? "—",
    ticketType: ticketRow.ticket_type ?? "General",
    price: typeof ticketRow.donation_amount === "number" ? ticketRow.donation_amount : ticketRow.price ?? 0,
    qrCodeUrl: ticketRow.qr_code_url ?? `/api/qrcode/${ticketRow.ticket_number ?? ticketNumber}`,
    isUsed: !!ticketRow.is_used,
  };

  // normalisasi gender dari DB (beberapa nama field)
  const rawGender = (ticketRow.gender ?? ticketRow.sex ?? ticketRow.jenis_kelamin ?? "").toString().toLowerCase();
  const isMale = /^(l|m|male|laki)/i.test(rawGender);

  const contactNumber = isMale ? MALE_CONTACT : FEMALE_CONTACT;
  const groupLink = isMale ? MALE_GROUP_LINK : FEMALE_GROUP_LINK;

  const name = ticketRow.name ?? ticketRow.nama ?? "";
  const donation = typeof ticketRow.donation_amount === "number" ? ticketRow.donation_amount : ticketRow.donation_amount ?? 0;

  const prefillMessage = encodeURIComponent(
    `Assalamu'alaikum,\nSaya sudah mendaftar event.\nNama: ${name}\nNomor tiket: ${ticket.id}\nNominal infaq: Rp ${donation}\nMohon konfirmasi dan petunjuk selanjutnya.`
  );

  const waUrl = `https://wa.me/${contactNumber}?text=${prefillMessage}`;

  return (
    <div className="min-h-screen bg-[#F7FBFF] py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-2">Konfirmasi Pendaftaran</h1>
          <p className="text-sm text-gray-600 mb-4">Halaman ini menyimpan status pendaftaran & instruksi konfirmasi untuk tiket Anda.</p>

          <div className="mb-6">
            <div className="text-sm text-gray-600">Nomor tiket</div>
            <div className="flex items-center justify-between gap-3 bg-gray-100 px-4 py-3 rounded mt-2">
              <div className="font-mono font-semibold text-lg">{ticket.id}</div>
              {/* <div className="flex gap-2">
                <button
                  onClick={() => {
                    // note: server component can't use navigator; use simple anchor fallback link to copy handled client-side if needed.
                  }}
                  className="px-3 py-1 rounded bg-[#0EA5E9] text-white"
                >
                  Salin
                </button>
                <a href={ticket.qrCodeUrl} className="px-3 py-1 rounded border" target="_blank" rel="noreferrer">Lihat QR</a>
              </div> */}
              <TicketActionsClient
                ticketId={ticket.id}
                waUrl={waUrl}
                groupLink={groupLink}
                qrUrl={ticket.qrCodeUrl}
              />
            </div>
          </div>

          <div className="mb-6">
            <TicketCard ticket={ticket} />
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded border">
            <div className="font-medium mb-2">Petunjuk Konfirmasi</div>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
              <li>Jika ingin infaq, transfer ke: <span className="font-semibold">{BANK_INFO.bank} — {BANK_INFO.accountNumber} (a.n. {BANK_INFO.accountName})</span></li>
              <li>Kirim bukti transfer via WhatsApp ke kontak yang sesuai (tombol di bawah).</li>
              <li>Jika tidak melakukan infaq, kirim pesan konfirmasi sederhana.</li>
            </ol>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700">
              <span className="icon">
                <FaWhatsapp />
              </span>
              {/* Hubungi WA Admin {isMale ? "Kontak Laki-laki" : "Kontak Perempuan"} */}
              Hubungi WA Admin
            </a>

            <a href={groupLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded border">
              {/* Gabung Group WhatsApp {isMale ? "Laki-laki" : "Perempuan"} */}
              <span className="icon">
                <FaWhatsapp />
              </span>
              Gabung Group WhatsApp
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Jika ada masalah, hubungi admin event.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
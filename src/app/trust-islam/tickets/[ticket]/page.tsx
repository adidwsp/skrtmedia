// app/trust-islam/tickets/[ticket]/page.tsx
import { Metadata } from "next";
import React from "react";
import TicketCard from "@/components/Trust-Islam/Ticket/TicketCard";
import TicketActionsClient from "@/components/Trust-Islam/Ticket/TicketActionsClient";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Trust Islam - Ticket",
  description: "Trust Islam - Your Gateway to Islamic Knowledge",
};

type Params = { params: { ticket: string } };

const MALE_CONTACT = "6289647011970";
const FEMALE_CONTACT = "6281210736312";
const MALE_GROUP_LINK = "https://chat.whatsapp.com/JLte0VN7DJfLGnJvR1IVbL";
const FEMALE_GROUP_LINK = "https://chat.whatsapp.com/HJ4gFRLlAKjGRNNxOPPcLj";
const BANK_INFO = {
  bank: "Bank Jago",
  accountName: "Adi Dwi Saputra",
  accountNumber: "506693547160",
};

export default async function TicketConfirmationPage({ params }: Params) {
  const ticketNumber = params.ticket;

  // server-side supabase client (your util should use service role key or server env)
  const supabase = await createClient(cookies());

  const { data: ticketRow, error } = await supabase
    .from("tickets")
    .select("*, events(*)")
    .eq("ticket_number", ticketNumber)
    .maybeSingle();

  if (error) {
    console.error("Supabase fetch error:", error);
    return notFound();
  }
  if (!ticketRow) return notFound();

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
    // forward DB fields
    name: ticketRow.name ?? ticketRow.nama ?? null,
    email: ticketRow.email ?? null,
    phone: ticketRow.phone ?? null,
    donation_amount: ticketRow.donation_amount ?? null,
    donation_bank: ticketRow.donation_bank ?? null,
    created_at: ticketRow.created_at ?? null,
    gender: ticketRow.gender ?? ticketRow.sex ?? ticketRow.jenis_kelamin ?? null,
  };

  // normalize gender
  const rawGender = (ticket.gender ?? "").toString().toLowerCase();
  const isMale = /^(l|m|male|laki)/i.test(rawGender);
  const contactNumber = isMale ? MALE_CONTACT : FEMALE_CONTACT;
  const groupLink = isMale ? MALE_GROUP_LINK : FEMALE_GROUP_LINK;

  const name = ticket.name ?? "";
  const donation = typeof ticket.donation_amount === "number" ? ticket.donation_amount : ticket.donation_amount ?? 0;
  const prefillMessage = encodeURIComponent(
    `Assalamu'alaikum,\nSaya sudah mendaftar event.\nNama: ${name}\nNomor tiket: ${ticket.id}\nNominal infaq: Rp ${donation}\nMohon konfirmasi dan petunjuk selanjutnya.`
  );
  const waUrl = `https://wa.me/${contactNumber}?text=${prefillMessage}`;

  // Server component returns markup only. All interactive handlers live in client component (TicketActionsClient).
  return (
    <>
      <main>
        <div className="min-h-screen bg-[#F7FBFF] py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h1 className="text-2xl font-bold mb-2">Konfirmasi Pendaftaran</h1>
              <p className="text-sm text-gray-600 mb-4">Halaman ini menyimpan status pendaftaran & instruksi konfirmasi untuk tiket Anda.</p>

              <div className="mb-6">
                <div className="text-sm text-gray-600">Nomor tiket</div>
                <div className="flex items-center justify-between gap-3 bg-gray-100 px-4 py-3 rounded mt-2">
                  <div className="font-mono font-semibold text-lg">{ticket.id}</div>
                  {/* client component for actions */}
                  <TicketActionsClient
                    ticketId={ticket.id}
                  />
                </div>
              </div>

              <div className="mb-6">
                <TicketCard ticket={ticket as any} />
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded border">
                <div className="font-medium mb-2">Petunjuk Konfirmasi</div>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                  <li>Jika ingin infaq, transfer (opsional) ke: <span className="font-semibold">{BANK_INFO.bank} — {BANK_INFO.accountNumber} (a.n. {BANK_INFO.accountName})</span></li>
                  <li>Kirim bukti transfer via WhatsApp ke kontak yang sesuai (tombol di atas).</li>
                  <li>Jika tidak melakukan infaq, kirim pesan konfirmasi sederhana.</li>
                </ol>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a href={waUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700">
                  <span className="icon"><FaWhatsapp /></span>
                  Hubungi WA Admin
                </a>

                <a href={groupLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded border">
                  <span className="icon"><FaWhatsapp /></span>
                  Gabung Group WhatsApp
                </a>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>Jika ada masalah, hubungi admin event.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// components/TicketActionsClient.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  ticketId: string;
};

/**
 * Client-only component untuk tombol interaktif:
 * - Copy ticket
 * - Buka WhatsApp (link)
 * - Gabung group WA (link)
 * - Navigasi / lihat QR
 */
export default function TicketActionsClient({ ticketId }: Props) {
  const router = useRouter();

  async function copyTicket() {
    try {
      await navigator.clipboard.writeText(ticketId);
      // simple visual feedback via alert or use a toast lib
      alert("Nomor tiket disalin ke clipboard");
    } catch {
      alert("Gagal menyalin nomor tiket");
    }
  }

  // function openWhatsApp() {
  //   window.open(waUrl, "_blank", "noopener,noreferrer");
  // }

  // function openGroup() {
  //   window.open(groupLink, "_blank", "noopener,noreferrer");
  // }


  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <button onClick={copyTicket} className="px-4 py-2 rounded bg-[#0EA5E9] text-white font-semibold">Salin kode tiket</button>
    </div>
  );
}

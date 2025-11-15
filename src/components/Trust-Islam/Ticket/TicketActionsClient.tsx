// components/Trust-Islam/Ticket/TicketActionsClient.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  ticketId: string;
  waUrl: string;
  groupLink: string;
  qrUrl: string;
};

export default function TicketActionsClient({ ticketId, waUrl, groupLink, qrUrl }: Props) {
  const router = useRouter();

  async function copyTicket() {
    try {
      await navigator.clipboard.writeText(ticketId);
      alert("Nomor tiket disalin ke clipboard");
    } catch {
      alert("Gagal menyalin");
    }
  }

  function openUrl(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={copyTicket} className="px-3 py-1 rounded bg-[#0EA5E9] text-white text-sm">
        Salin
      </button>
      {/* <button onClick={() => openUrl(waUrl)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">
        Hubungi WA
      </button>
      <button onClick={() => openUrl(groupLink)} className="px-3 py-1 rounded border text-sm">
        Gabung Group
      </button>
      <button onClick={() => router.push(`/trust-islam/tickets/${encodeURIComponent(ticketId)}`)} className="px-3 py-1 rounded border text-sm">
        Lihat Halaman
      </button> */}
    </div>
  );
}
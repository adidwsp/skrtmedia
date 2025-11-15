// components/SuccessModal.tsx
import React from 'react';
import { FaWhatsapp, FaCopy } from 'react-icons/fa';
import { SuccessTicket, MALE_CONTACT, FEMALE_CONTACT, MALE_GROUP_LINK, FEMALE_GROUP_LINK, BANK_INFO } from '@/components/Trust-Islam/types/form';

interface SuccessModalProps {
  successTicket: SuccessTicket;
  setSuccessTicket: (ticket: SuccessTicket) => void;
  copyTicket: () => void;
  setToast: (toast: any) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  successTicket,
  setSuccessTicket,
  copyTicket,
  setToast
}) => {
  if (!successTicket) return null;

  const d = successTicket.data ?? {};
  const rawGender = (d.gender ?? "").toString().toLowerCase();
  const isMale = /^(l|m|male|laki)/i.test(rawGender);
  const contactNumber = isMale ? MALE_CONTACT : FEMALE_CONTACT;
  const groupLink = isMale ? MALE_GROUP_LINK : FEMALE_GROUP_LINK;

  const name = d.name ?? "";
  const donation = typeof d.donation_amount === "number" ? d.donation_amount : 0;
  const prefillMessage = encodeURIComponent(
    `Assalamu'alaikum,\nSaya sudah mendaftar event. Berikut detail:\nNama: ${name}\nNomor tiket: ${successTicket.ticket_number}\nNominal infaq: Rp ${donation || 0}\nMohon konfirmasi dan petunjuk selanjutnya.`
  );

  const waUrl = `https://wa.me/${contactNumber}?text=${prefillMessage}`;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-green-600">Pendaftaran Berhasil!</h3>
          <button 
            onClick={() => setSuccessTicket(null)} 
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Nomor tiket Anda:</p>

          <div className="flex items-center justify-between gap-3 bg-green-50 px-4 py-3 rounded-xl border border-green-200">
            <div className="font-mono font-bold text-lg text-green-800">
              {successTicket.ticket_number}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={copyTicket}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaCopy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="font-medium text-blue-800 mb-2">Petunjuk Konfirmasi</div>
            <ol className="text-sm list-decimal list-inside space-y-1 text-blue-700">
              <li>Silakan transfer sesuai nominal infaq ke:</li>
              <li className="font-semibold mt-1">{BANK_INFO.bank} — {BANK_INFO.accountNumber}</li>
              <li>a.n. {BANK_INFO.accountName}</li>
              <li className="mt-2">Kirim bukti transfer via WhatsApp</li>
            </ol>
          </div>

          <div className="grid gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
              onClick={() => setToast({ type: "info", message: "Membuka WhatsApp..." })}
            >
              <FaWhatsapp className="w-5 h-5" />
              Hubungi WA Admin
            </a>

            <a
              href={groupLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-gray-300 hover:bg-gray-50 py-3 px-4 rounded-xl font-medium transition-colors"
              onClick={() => setToast({ type: "info", message: "Membuka Group WhatsApp..." })}
            >
              Gabung Group WhatsApp Peserta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
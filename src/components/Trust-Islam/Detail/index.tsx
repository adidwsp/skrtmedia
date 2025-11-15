"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, TabItem, Tabs } from "flowbite-react";
import { HiLocationMarker, HiAdjustments, HiClipboardList, HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FaUniversity, FaPhone, FaEnvelope, FaUser, FaUpload, FaWhatsapp, FaCalendar, FaClock, FaTicketAlt, FaUserFriends } from "react-icons/fa";
import { createClient } from "src/utils/supabase/client";

const supabase = createClient();


/* ---------- Types ---------- */
interface FormState {
  name: string;
  gender: string;
  address: string;
  is_student: boolean;
  university: string;
  phone: string;
  email: string;
  with_child: boolean;
  num_of_children: number;
}

type Errors = Partial<Record<keyof FormState, string>>;

type ToastState = { type: "success" | "error" | "info"; message: string } | null;
type SuccessTicket = { ticket_number: string; data: any } | null;

/* ---------- Toast component ---------- */
const Toast: React.FC<{ state: Exclude<ToastState, null>; onClose: () => void }> = ({ state, onClose }) => {
  const bg = state.type === "success" ? "bg-green-600" : state.type === "error" ? "bg-red-600" : "bg-blue-600";
  return (
    <div className={`fixed right-4 top-6 z-[10000] rounded-lg shadow-lg text-white px-4 py-3 ${bg} animate-slide`}>
      <div className="flex items-start gap-3">
        <div className="font-semibold">{state.type === "success" ? "Success" : state.type === "error" ? "Error" : "Info"}</div>
        <div className="text-sm">{state.message}</div>
        <button className="ml-3 opacity-90" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

/* ---------- Component ---------- */
const Detail: React.FC = () => {
  /* form / validation */
  const [activeTab, setActiveTab] = useState<string>("target");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDonationDialog, setShowDonationDialog] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    gender: "",
    address: "",
    is_student: false,
    university: "",
    phone: "",
    email: "",
    with_child: false,
    num_of_children: 0,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [successTicket, setSuccessTicket] = useState<SuccessTicket>(null);

  /* donation state */
  // const [donationAmount, setDonationAmount] = useState<number>(0);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [bank, setBank] = useState<string>("Bank Jago");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploadingProof, setUploadingProof] = useState<boolean>(false);

  /* lock body scroll when modal open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (showForm || showDonationDialog || successTicket) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev;
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showForm, showDonationDialog, successTicket]);

  function handleTab(tab: string) { setActiveTab(tab); }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((s) => ({ ...s, [name]: checked } as FormState));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return;
    }
    if (type === "number") {
      const raw = (e.target as HTMLInputElement).value;
      const parsed = raw === "" ? 0 : Number(raw);
      setForm((s) => ({ ...s, [name]: Number.isNaN(parsed) ? 0 : parsed } as FormState));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return;
    }
    const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    setForm((s) => ({ ...s, [name]: value } as FormState));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const formatRupiah = (value: string): string => {
  // Hapus semua karakter non-digit
  const cleanValue = value.replace(/\D/g, '');
  
  // Jika kosong, return string kosong
  if (cleanValue === '') return '';
  
  // Format dengan titik sebagai pemisah ribuan
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatRupiah(rawValue);
    setDonationAmount(formattedValue);
  };

  // Untuk mendapatkan nilai numeric (untuk submit)
  const getNumericValue = (): number => {
    if (!donationAmount) return 0;
    return parseInt(donationAmount.replace(/\./g, '')) || 0;
  };

  function validateAll(): Errors {
    const newErr: Errors = {};
    if (!form.name.trim()) newErr.name = "Nama wajib diisi";
    if (!form.phone.trim()) newErr.phone = "No HP wajib diisi";
    if (!form.email.trim()) newErr.email = "Email wajib diisi";
    else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email)) newErr.email = "Format email tidak valid";
    }
    if (form.with_child) {
      if (!Number.isInteger(form.num_of_children) || form.num_of_children < 0) {
        newErr.num_of_children = "Masukkan jumlah anak yang valid (0 atau lebih)";
      }
    }
    return newErr;
  }

  /* Step 1: user submit form -> open donation dialog if valid */
  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    const newErr = validateAll();
    if (Object.keys(newErr).length > 0) {
      setErrors(newErr);
      setToast({ type: "error", message: "Periksa kembali form Anda" });
      return;
    }
    // open donation dialog
    setShowDonationDialog(true);
  }

  /* handle file selection for proof */
  function onSelectProof(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setProofFile(null); return;
    }
    // optional: validate file size (limit 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (f.size > maxSize) {
      setToast({ type: "error", message: "Ukuran file terlalu besar (max 5MB)" });
      return;
    }
    setProofFile(f);
  }

  /* upload proof to Supabase Storage -> returns path or null */
  async function uploadProofFile(ticketNumber: string): Promise<string | null> {
    if (!proofFile) return null;
    setUploadingProof(true);
    try {
      const ext = proofFile.name.split(".").pop();
      const filename = `proof_${ticketNumber}_${Date.now()}.${ext}`;
      const bucket = "ticket-proofs"; // ensure this bucket exists
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, proofFile, { contentType: proofFile.type, upsert: false });

      if (error) {
        console.error("Upload error:", error);
        setToast({ type: "error", message: "Gagal mengunggah bukti transfer" });
        return null;
      }
      // return public path — if you use public bucket you can get public URL:
      // const { publicURL } = supabase.storage.from(bucket).getPublicUrl(data.path);
      // return publicURL;
      // Alternatively, store the path and generate signed URL later.
      return data.path;
    } catch (err) {
      console.error("Unexpected upload error:", err);
      setToast({ type: "error", message: "Gagal mengunggah bukti transfer" });
      return null;
    } finally {
      setUploadingProof(false);
    }
  }

  /* Finalize registration: upload proof if needed, then insert ticket */
  async function confirmDonationAndRegister() {
    // donation can be zero - MASIH EROR GAESS
    // if (donationAmount > 0 && !proofFile) {
    //   setToast({ type: "error", message: "Jika memberi donasi lebih dari 0, unggah bukti transfer." });
    //   return;
    // }

    const numericAmount = getNumericValue();

    setLoading(true);
    setToast(null);

    const ticketNumber =
      "T-" +
      (typeof crypto !== "undefined" && (crypto as any).randomUUID
        ? (crypto as any).randomUUID().slice(0, 8)
        : Math.random().toString(36).slice(2, 10));


    // upload proof if donation > 0
    let proof_path: string | null = null;
    // if (donationAmount > 0 && proofFile) {
    //   const p = await uploadProofFile(ticketNumber);
    //   if (!p) {
    //     setLoading(false);
    //     return; // upload failed; toast already shown
    //   }
    //   proof_path = p;
    // }

    const payload = {
      ticket_number: ticketNumber,
      name: form.name,
      gender: form.gender,
      address: form.address,
      is_student: form.is_student,
      university: form.university || null,
      phone: form.phone,
      email: form.email,
      with_child: form.with_child,
      num_of_children: form.with_child ? Number(form.num_of_children || 0) : 0,
      donation_amount: numericAmount,
      donation_bank: bank,
      donation_proof_path: proof_path,
      created_at: new Date().toISOString(),
    };

    try {
      // Insert to tickets table
      const { data, error } = await supabase.from("tickets").insert([payload]).select().single();

      if (error) {
        console.error("Supabase insert error:", error);
        setToast({ type: "error", message: "Gagal menyimpan data pendaftaran: " + (error.message || "unknown") });
        setLoading(false);
        return;
      }

      // success
      setSuccessTicket({ ticket_number: ticketNumber, data });
      setShowDonationDialog(false);
      setShowForm(false);
      setToast({ type: "success", message: "Pendaftaran berhasil — cek nomor tiket pada jendela konfirmasi." });

      // reset form & donation
      setForm({
        name: "",
        gender: "",
        address: "",
        is_student: false,
        university: "",
        phone: "",
        email: "",
        with_child: false,
        num_of_children: 0,
      });
      // setDonationAmount(0);
      setProofFile(null);

      // Optional: send email with ticket & message
      // recommended: implement server-side API route that uses SendGrid / Mailgun and call it here.
      // Example (pseudo):
      // await fetch('/api/send-ticket-email', { method: 'POST', body: JSON.stringify({ to: form.email, ticket: ticketNumber }) });
      //
      // I didn't implement the API route here — do it server-side (service role key) to avoid exposing keys.
    } catch (err) {
      console.error("Unexpected error:", err);
      setToast({ type: "error", message: "Terjadi kesalahan saat mendaftar." });
    } finally {
      setLoading(false);
    }
  }

  function copyTicket() {
    if (!successTicket) return;
    navigator.clipboard?.writeText(successTicket.ticket_number)
      .then(() => setToast({ type: "success", message: "Nomor tiket disalin ke clipboard" }))
      .catch(() => setToast({ type: "error", message: "Gagal menyalin" }));
  }

  /* small animation style */
  const style = `
    @keyframes slide { from { transform: translateY(-8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
    .animate-slide { animation: slide .22s ease; }
  `;


  {/* ==== Konfigurasi kontak & grup (ganti sesuai kebutuhan) ==== */}
  {/* Nomor WA harus dalam format internasional tanpa +, contoh: 6281234567890 */}
  const MALE_CONTACT = "6289647011970";        // kamu / kontak laki-laki
  const FEMALE_CONTACT = "6281210736312";      // admin perempuan
  const MALE_GROUP_LINK = "https://chat.whatsapp.com/JLte0VN7DJfLGnJvR1IVbL";
  const FEMALE_GROUP_LINK = "https://chat.whatsapp.com/HJ4gFRLlAKjGRNNxOPPcLj";
  const BANK_INFO = {
    bank: "Bank Jago",
    accountName: "Adi Dwi Saputra",
    accountNumber: "506693547160"
  };
  {/* ======================================================= */}

  
  /* ---------- JSX (UI) ---------- */
  return (
    <>
      <style>{style}</style>

      <section id="detail-acara" className="bg-[#E6F9FF]/50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-heading mb-12 text-center text-4xl font-bold">Semua yang Perlu Kamu Tahu</h2>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <Tabs className="justify-around" aria-label="Default tabs" variant="default">
                <TabItem active title="Lokasi" icon={HiLocationMarker}>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Untuk Siapa Acara Ini?</h3>
                      <p className="mb-6">Acara ini dirancang khusus untuk pemuda-pemudi di Karawang baik dari mahasiswa maupun umum yang mempunyai semangat untuk belajar bersama dan memperbaiki diri.</p>

                      {/* Informasi Waktu - Minimalis */}
                      <div className="mb-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col xxs: md:flex-row items-center justify-between">
                          <div className="xs:flex items-center mb-4 md:mb-0">
                            <div className="bg-[#0EA5E9] text-white p-3 rounded-xl mr-4 justify-self-center">
                              <FaCalendar className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="text-lg font-bold text-gray-800">Minggu, 7 Desember 2025</div>
                              <div className="text-gray-600 flex items-center">
                                <FaClock className="w-4 h-4 mr-1" />
                                14:00 - 18:00 WIB
                              </div>
                            </div>
                          </div>
                          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                            Akan Datang
                          </div>
                        </div>
                      </div>

                      {/* Grid 3 Kolom */}
                      <div className="grid sm:grid-cols-3 gap-6 text-center mb-6">
                        <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg justify-items-center">
                          <FaCalendar size={60} color="#0EA5E9" />
                          <p className="font-bold text-lg sm:text-sm md:text-lg mt-3">Waktu Acara</p>
                          <p className="text-gray-600 sm:text-sm sm:mt-2 md:text-base">Minggu, 7 Des 2025</p>
                          <p className="text-sm text-gray-500 sm:text-sm sm:mt-2 md:text-base">14:00 - 18:00 WIB</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg justify-items-center">
                          <HiUsers size={60} color="#0EA5E9" />
                          <p className="font-bold text-lg sm:text-sm md:text-lg mt-3">Target Peserta</p>
                          <p className="text-gray-600 sm:text-sm sm:mt-2 md:text-base">50 Laki-laki & 50 Perempuan</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg justify-items-center">
                          <HiLocationMarker size={60} color="#0EA5E9" />
                          <p className="font-bold text-lg sm:text-sm md:text-lg mt-3">Lokasi Acara</p>
                          <p className="text-gray-600 sm:text-sm sm:mt-2 md:text-base">Warung Desa (Wardes), Karawang</p>
                        </div>
                      </div>

                      {/* Peta dan Tombol */}
                      <div className="w-full h-64 md:h-96 rounded overflow-hidden shadow-lg mb-6">
                        <iframe 
                          title="Lokasi Warung Desa Karawang" 
                          src="https://www.google.com/maps?q=Warung+Desa+Karawang&output=embed" 
                          className="w-full h-full border-0" 
                          allowFullScreen 
                          loading="lazy" 
                        />
                      </div>

                      <div className="text-center">
                        <button 
                          onClick={() => setShowForm(true)} 
                          className="inline-block bg-[#0EA5E9] hover:bg-[#0ca6dc] transition text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl"
                        >
                          Order Tiket Sekarang
                        </button>
                      </div>
                    </div>
                  </TabItem>

                <TabItem title="Pendaftaran" icon={HiClipboardList}>
                  {/* pendaftaran content tetap sama */}
                  <div className="tab-pane" id="pendaftaran">
                    <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Amankan Kuota!</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Langkah Registrasi:</h4>
                        <ol className="space-y-4">
                          <li className="flex items-start">
                            <span className="bg-[#0EA5E9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span>
                            <span>Isi formulir pendaftaran melalui tombol Order Tiket.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-[#0EA5E9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span>
                            <span>Masukkan nominal infaq terbaik dan unggah bukti pembayaran.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-[#0EA5E9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span>
                            <span>Pendaftaran berhasil; simpan nomor tiket untuk konfirmasi.</span>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-[#0EA5E9]/10 p-6 rounded-lg border-2 border-dashed border-[#0EA5E9]">
                        <h4 className="text-lg font-semibold mb-2">Investasi Ilmu Hanya Dengan</h4>
                        <p className="text-3xl font-bold mb-4">Infaq Terbaik Anda</p>
                        <p className="font-semibold mb-2">Benefit:</p>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Snack & Makanan</li>
                          <li>Ilmu Bermanfaat</li>
                          <li>Relasi Baru</li>
                        </ul>
                        <div className="mt-6 text-center">
                          <Button onClick={() => setShowForm(true)} className="inline-block bg-[#0EA5E9] hover:bg-[#0ca6dc] transition text-white px-5 py-2 rounded-lg font-semibold shadow-sm">Order Tiket</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabItem>

                <TabItem title="Rundown" icon={MdDashboard}>
                  {/* ... */}
                  <div>
                    <h3 className="font-heading mb-6 text-2xl font-bold text-[#0B6E99]">Rangkaian Acara</h3>
                    <div className="relative border-l-2 border-dashed border-[#0B6E99] pl-8">
                      {[
                        ["14:00 - 15:00", "Registrasi Offline"],
                        ["15:00 - 15:30", "Sholat Ashar"],
                        ["15:30 - 15:45", "Pembukaan Oleh MC"],
                        ["15:45 - 15:50", "Tilawah"],
                        ["15:50 - 16:00", "Sambutan Ketua Acara"],
                        ["16:00 - 17:10", "Pembedahan Masalah dan Solusi"],
                        ["17:10 - 17:30", "Q & A"],
                        ["17:40 - 17:50", "Muhasabah & Doa"],
                        ["17:50 - 18:00", "Penutupan"],
                      ].map((it, i) => (
                        <div key={i} className="relative mb-8">
                          <div className="absolute top-1 -left-[42px] h-4 w-4 rounded-full border-4 border-white bg-[#0EA5E9]"></div>
                          <p className="font-bold">{it[0]}</p>
                          <p>{it[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabItem>

                <TabItem title="Tata Tertib" icon={HiAdjustments}>
                  <div>
                    <h3 className="font-heading mb-6 text-2xl font-bold text-[#0B6E99]">Adab di Majelis Ilmu</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        ["🕒", "Datang tepat waktu."],
                        ["❤️", "Luruskan niat karena Allah."],
                        ["🤫", "Jaga ketenangan selama acara."],
                        ["📵", "Non-aktifkan nada dering HP."],
                        ["👕", "Berpakaian sopan & menutup aurat."],
                        ["✍️", "Fokus menyimak & mencatat."],
                      ].map((it, i) => (
                        <div key={i} className="flex items-center rounded-lg bg-gray-50 p-4">
                          <span className="mr-4 text-2xl">{it[0]}</span>
                          <span>{it[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabItem>
              </Tabs>
            </div>

            {/* modal form (step 0) */}
            <div className="rounded-lg bg-white p-8 shadow-lg mt-6">
              {showForm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                  <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2"><FaUser /> Form Pendaftaran</h3>
                      <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                    </div>

                    <form onSubmit={onSubmitForm} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="text-sm font-medium flex items-center gap-2">Nama <span className="text-red-500">*</span></span>
                          <div className="mt-1 relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input name="name" value={form.name} onChange={handleChange} placeholder="Nama lengkap" className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors.name ? "border-red-400" : "border-gray-200"} shadow-sm`} />
                          </div>
                          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium">Jenis Kelamin</span>
                          <div className="mt-2 flex gap-4 items-center">
                            <label className="inline-flex items-center gap-2">
                              <input type="radio" name="gender" value="Laki-laki" checked={form.gender === "Laki-laki"} onChange={handleChange} />
                              <span>Laki-laki</span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                              <input type="radio" name="gender" value="Perempuan" checked={form.gender === "Perempuan"} onChange={handleChange} />
                              <span>Perempuan</span>
                            </label>
                          </div>
                        </label>
                      </div>

                      <label className="block">
                        <span className="text-sm font-medium">Alamat</span>
                        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Contoh: Jl. Merdeka No. 1, Karawang" className="mt-1 block w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]" rows={2} />
                      </label>

                      <div className="grid md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                          <span className="text-sm font-medium flex items-center gap-2">No HP <span className="text-red-500">*</span></span>
                          <div className="mt-1 relative">
                            <FaPhone className="absolute left-3 top-3 text-gray-400" />
                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors.phone ? "border-red-400" : "border-gray-200"} shadow-sm`} />
                          </div>
                          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                        </label>

                        <label className="flex flex-col">
                          <span className="text-sm font-medium flex items-center gap-2">Email <span className="text-red-500">*</span></span>
                          <div className="mt-1 relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input name="email" value={form.email} onChange={handleChange} placeholder="nama@domain.com" className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors.email ? "border-red-400" : "border-gray-200"} shadow-sm`} />
                          </div>
                          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                        </label>
                      </div>

                      <div className="items-center gap-6">
                        <label className="inline-flex items-center gap-3">
                          <input type="checkbox" name="is_student" checked={form.is_student} onChange={handleChange} />
                          <span>Saya mahasiswa</span>
                        </label>
                        {form.is_student && (
                          <label className="flex-1">
                            <div className="mt-1 relative">
                              <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                              <input name="university" value={form.university} onChange={handleChange} placeholder="Nama Universitas" className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]" />
                            </div>
                          </label>
                        )}
                      </div>

                      <div className="flex items-center gap-6">
                        <label className="inline-flex items-center gap-3">
                          <input type="checkbox" name="with_child" checked={form.with_child} onChange={handleChange} />
                          <span>Membawa anak?</span>
                        </label>
                        {form.with_child && (
                          <label className="flex-1">
                            <span className="text-sm font-medium">Jumlah Anak</span>
                            <input type="number" min={0} name="num_of_children" value={form.num_of_children} onChange={handleChange} className={`mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors.num_of_children ? "border-red-400" : "border-gray-200"}`} />
                            {errors.num_of_children && <p className="text-sm text-red-500 mt-1">{errors.num_of_children}</p>}
                          </label>
                        )}
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg border hover:bg-gray-50">Batal</button>
                        <button type="submit" disabled={loading} className={`px-6 py-2 rounded-lg text-white font-semibold shadow ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0EA5E9] hover:bg-[#0ca6dc]"}`}>
                          {loading ? "Memproses..." : "Daftar"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* * small confirmation card
              {!showForm && successTicket == null && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                  <div className="font-semibold text-gray-700">Sudah mendaftar? Klik Tiket Anda.</div>
                  <Button
                    href="/trust-islam/ticket"
                    className="mt-2 ease-in-up shadow-btn hover:shadow-btn-hover bg-[#0EA5E9] hover:bg-[#0ca6dc] rounded-xs px-6 py-2 text-base font-medium text-white transition duration-300"
                  >
                    Tiket Anda
                  </Button>
                </div>
              )} */}

              {/* * submitted notice (non-modal) */}
              {/* {!showForm && successTicket == null && toast?.type === "success" && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-semibold text-green-700">Pendaftaran berhasil</div>
                </div>
              )} */}

              {/* Bagian utama footer */}
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-12">
                {/* Kontak Admin */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                      Butuh Bantuan?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
                      Hubungi admin kami yang siap membantu Anda dengan senang hati.
                    </p>
                  </div>

                  {/* Kartu Kontak Admin */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Admin Laki-laki */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <FaUser className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Admin Laki-laki</h3>
                          <p className="text-sm text-gray-500">Siap membantu</p>
                        </div>
                      </div>
                      <a
                        href={`https://wa.me/${MALE_CONTACT}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        Hubungi via WhatsApp
                      </a>
                    </div>

                    {/* Admin Perempuan */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-pink-100 p-3 rounded-xl">
                          <FaUserFriends className="w-6 h-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Admin Perempuan</h3>
                          <p className="text-sm text-gray-500">Siap membantu</p>
                        </div>
                      </div>
                      <a
                        href={`https://wa.me/${FEMALE_CONTACT}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        Hubungi via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Pencarian Tiket */}
                <div className="flex flex-col justify-center">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-8 text-white text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="bg-white/20 p-3 rounded-2xl mb-4">
                        <FaTicketAlt className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        Sudah Mendaftar?
                      </h3>
                      <p className="text-blue-100 mb-6 max-w-sm">
                        Cek status pendaftaran dan informasi tiket Anda dengan mudah. Masukkan nomor tiket untuk melihat detail lengkap.
                      </p>
                      <Link
                        href="/trust-islam/ticket"
                        className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                      >
                        <FaTicketAlt className="w-5 h-5" />
                        Cek Tiket Saya
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Donation Dialog (step 2) */}
      {showDonationDialog && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[95vh] flex flex-col">
            {/* Header dengan gradient */}
            <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0B6E99] p-6 text-white flex-shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Langkah Terakhir</h3>
                  <p className="text-blue-100 text-sm mt-1">Tambahkan nominal infaq terbaik Anda</p>
                </div>
                <button 
                  onClick={() => { setShowDonationDialog(false); setProofFile(null); }} 
                  className="text-white hover:text-blue-200 transition-colors p-1 rounded-full hover:bg-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Konten utama yang bisa di-scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Section Nominal Infaq */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">Nominal Infaq (Rp)</label>
                
                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[10000, 25000, 50000, 100000, 250000, 500000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        setDonationAmount(formatted);
                      }}
                      className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 hover:border-[#0EA5E9] hover:bg-blue-50 transition-all duration-200"
                    >
                      {amount.toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>

                {/* Input Nominal */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-semibold">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={donationAmount}
                    onChange={handleDonationChange}
                    placeholder="Masukkan nominal"
                    className="block w-full border border-gray-300 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent text-lg font-semibold placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">IDR</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Kosongkan jika tidak ingin berdonasi</p>
              </div>

              {/* Section Bank Transfer */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="text-sm font-semibold text-gray-700 block mb-3">Pilih Bank Transfer</label>
                
                <select 
                  value={bank} 
                  onChange={(e) => setBank(e.target.value)} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent bg-white"
                >
                  <option>Bank Jago</option>
                </select>

                {/* Bank Card */}
                <div className="mt-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-5 text-white shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-blue-200 text-sm font-medium">Nomor Rekening</div>
                      <div className="font-mono text-xl xs:text-2xl font-bold tracking-wider">5066 9354 7160</div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Image 
                        src="/images/component/logo-jago.png" 
                        alt="Bank Jago Logo" 
                        width={60} 
                        height={24}
                        className="filter brightness-0 invert"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200 text-sm">Atas Nama</span>
                      <span className="font-semibold text-sm xs:text-xl">Adi Dwi Saputra</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200 text-sm">Bank</span>
                      <span className="font-semibold text-sm xs:text-xl">Bank Jago</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-500/30">
                    <div className="flex items-center justify-center gap-2 text-blue-200 text-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Transfer ke nomor rekening di atas
                    </div>
                  </div>
                </div>
              </div>

              {/* Informasi Tambahan */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-800 text-sm">Penting!</h4>
                    <p className="text-amber-700 text-xs mt-1">
                      Pastikan transfer sesuai nominal yang Anda masukkan. Bukti transfer akan diminta setelah pendaftaran.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer dengan tombol yang tetap terlihat */}
            <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
              <div className="flex justify-between gap-3">
                <button 
                  type="button" 
                  onClick={() => { setShowDonationDialog(false); }}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-medium text-gray-700"
                >
                  Kembali
                </button>
                <button 
                  type="button" 
                  disabled={loading || uploadingProof} 
                  onClick={() => confirmDonationAndRegister()}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    loading || uploadingProof 
                      ? "bg-gray-400 cursor-not-allowed text-white" 
                      // : "bg-gradient-to-r from-[#0EA5E9] to-[#0B6E99] hover:from-[#0ca6dc] hover:to-[#0a5a80] text-white shadow-lg hover:shadow-xl"
                      : "bg-[#0EA5E9] hover:bg-[#0a5a80] text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading || uploadingProof ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Daftar
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast state={toast} onClose={() => setToast(null)} />}

      {/* Success modal with ticket number */}
      {successTicket && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pendaftaran Berhasil</h3>
              <button onClick={() => setSuccessTicket(null)} className="text-gray-500">✕</button>
            </div>

            

            <div className="space-y-3">
              <p className="text-sm text-gray-600">Nomor tiket Anda:</p>

              <div className="flex items-center justify-between gap-3 bg-gray-100 px-4 py-3 rounded">
                <div className="font-mono font-semibold text-lg">{successTicket.ticket_number}</div>
                <div className="flex gap-2">
                  <button onClick={copyTicket} className="px-3 py-1 rounded bg-[#0EA5E9] text-white">Salin</button>
                  <button
                    onClick={() => window.open(`/trust-islam/tickets/${successTicket.ticket_number}`, "_blank")}
                    className="px-3 py-1 rounded border"
                  >
                    Lihat
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <p>Simpan nomor tiket untuk konfirmasi pembayaran dan keperluan admin.</p>

                {/* ambil data dari successTicket.data jika ada */}
                {(() => {
                  const d = successTicket.data ?? {};
                  // gender bisa 'Laki-laki', 'Perempuan', 'male', 'female', dsb. normalisasi:
                  const rawGender = (d.gender ?? d.sex ?? d.jenis_kelamin ?? "").toString().toLowerCase();
                  const isMale = /^(l|m|male|laki)/i.test(rawGender);
                  const contactNumber = isMale ? MALE_CONTACT : FEMALE_CONTACT;
                  const groupLink = isMale ? MALE_GROUP_LINK : FEMALE_GROUP_LINK;

                  // buat template pesan WA
                  const name = d.name ?? d.nama ?? "";
                  const donation = typeof d.donation_amount === "number" ? d.donation_amount : d.donation_amount ?? "";
                  const prefillMessage = encodeURIComponent(
                    `Assalamu'alaikum,\nSaya sudah mendaftar event. Berikut detail:\nNama: ${name}\nNomor tiket: ${successTicket.ticket_number}\nNominal infaq: Rp ${donation || 0}\nMohon konfirmasi dan petunjuk selanjutnya.`
                  );

                  const waUrl = `https://wa.me/${contactNumber}?text=${prefillMessage}`;

                  return (
                    <>
                      <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-100">
                        <div className="font-medium">Petunjuk Konfirmasi</div>
                        <ol className="text-sm list-decimal list-inside mt-2 space-y-1 text-gray-600">
                          <li>Silakan transfer sesuai nominal infaq ke:</li>
                          <li className="mt-1 font-semibold">{BANK_INFO.bank} — {BANK_INFO.accountNumber} (a.n. {BANK_INFO.accountName})</li>
                          <li>Kirim bukti transfer via WhatsApp ke kontak yang tersedia di bawah.</li>
                          <li>Jika tidak melakukan infaq, cukup kirim pesan konfirmasi tanpa bukti.</li>
                        </ol>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-2">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
                          onClick={() => setToast({ type: "info", message: "Membuka WhatsApp..." })}
                          
                        >
                          {/* Hubungi WA {isMale ? "Kontak Laki-laki" : "Kontak Perempuan"} */}
                          <span className="icon">
                            <FaWhatsapp />
                          </span>
                          Hubungi WA Admin
                        </a>

                        <a
                          href={groupLink}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded border"
                          onClick={() => setToast({ type: "info", message: "Membuka Group WhatsApp..." })}
                        >
                          {/* Gabung Group WhatsApp {isMale ? "Laki-laki" : "Perempuan"} */}
                          Gabung Group WhatsApp Peserta
                        </a>
                        <hr/>
                        <a
                          href={`/trust-islam/tickets/${successTicket.ticket_number}`}
                          className="px-4 py-2 rounded bg-[#0EA5E9] text-white text-center"
                        >
                          Buka Halaman Konfirmasi
                        </a>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* <div className="text-right"> */}
                {/* <button onClick={() => setSuccessTicket(null)} className="px-4 py-2 rounded bg-gray-100">Tutup</button> */}
                {/* show modal with button: */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Detail;

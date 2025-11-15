// components/Detail.tsx (yang sudah dirapihkan)
"use client";
import React, { useEffect, useState } from "react";
import { TabItem, Tabs } from "flowbite-react";
import { HiLocationMarker, HiAdjustments, HiClipboardList, HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { createClient } from "src/utils/supabase/client";

// Komponen yang sudah dipisah
import Toast from '../../Toast';
import RegistrationForm from './RegistrationForm';
import DonationModal from './DonationModal';
import SuccessModal from './SuccessModal';
import ContactFooter from './ContactFooter';
import { FormState, Errors, ToastState, SuccessTicket } from '@/components/Trust-Islam/types/form';
import RegistrationTabProps from "./TabItem/RegistrationTabProps";
import RundownTab from "./TabItem/RundownTab";
import RulesTab from "./TabItem/RulesTab";
import LocationTab from "./TabItem/LocationTab";

const supabase = createClient();

const Detail: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<string>("target");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDonationDialog, setShowDonationDialog] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: "", gender: "", address: "", is_student: false,
    university: "", phone: "", email: "", with_child: false, num_of_children: 0,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [successTicket, setSuccessTicket] = useState<SuccessTicket>(null);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [bank, setBank] = useState<string>("Bank Jago");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploadingProof, setUploadingProof] = useState<boolean>(false);

  // Scroll lock effect
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (showForm || showDonationDialog || successTicket) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev;
    }
    return () => { document.body.style.overflow = prev; };
  }, [showForm, showDonationDialog, successTicket]);

  // Utility functions
  const formatRupiah = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue === '') return '';
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatRupiah(e.target.value);
    setDonationAmount(formattedValue);
  };

  const getNumericValue = (): number => {
    if (!donationAmount) return 0;
    return parseInt(donationAmount.replace(/\./g, '')) || 0;
  };

  // Form handling functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((s) => ({ ...s, [name]: checked } as FormState));
    } else if (type === "number") {
      const raw = (e.target as HTMLInputElement).value;
      const parsed = raw === "" ? 0 : Number(raw);
      setForm((s) => ({ ...s, [name]: Number.isNaN(parsed) ? 0 : parsed } as FormState));
    } else {
      const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
      setForm((s) => ({ ...s, [name]: value } as FormState));
    }
    
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateAll = (): Errors => {
    const newErr: Errors = {};
    if (!form.name.trim()) newErr.name = "Nama wajib diisi";
    if (!form.phone.trim()) newErr.phone = "No HP wajib diisi";
    if (!form.email.trim()) newErr.email = "Email wajib diisi";
    else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email)) newErr.email = "Format email tidak valid";
    }
    if (form.with_child && (!Number.isInteger(form.num_of_children) || form.num_of_children < 0)) {
      newErr.num_of_children = "Masukkan jumlah anak yang valid (0 atau lebih)";
    }
    return newErr;
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newErr = validateAll();
    if (Object.keys(newErr).length > 0) {
      setErrors(newErr);
      setToast({ type: "error", message: "Periksa kembali form Anda" });
      return;
    }
    setShowDonationDialog(true);
  };

  const confirmDonationAndRegister = async () => {
    const numericAmount = getNumericValue();
    setLoading(true);
    setToast(null);

    const ticketNumber = "T-" + (crypto.randomUUID?.().slice(0, 8) || Math.random().toString(36).slice(2, 10));

    const payload = {
      ticket_number: ticketNumber,
      name: form.name, gender: form.gender, address: form.address,
      is_student: form.is_student, university: form.university || null,
      phone: form.phone, email: form.email,
      with_child: form.with_child,
      num_of_children: form.with_child ? Number(form.num_of_children || 0) : 0,
      donation_amount: numericAmount, donation_bank: bank,
      donation_proof_path: null, created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase.from("tickets").insert([payload]).select().single();
      
      if (error) throw error;

      setSuccessTicket({ ticket_number: ticketNumber, data });
      setShowDonationDialog(false);
      setShowForm(false);
      setToast({ type: "success", message: "Pendaftaran berhasil!" });

      // Reset form
      setForm({ name: "", gender: "", address: "", is_student: false, university: "", 
               phone: "", email: "", with_child: false, num_of_children: 0 });
      setDonationAmount("");
      setProofFile(null);

    } catch (err) {
      console.error("Error:", err);
      setToast({ type: "error", message: "Terjadi kesalahan saat mendaftar." });
    } finally {
      setLoading(false);
    }
  };

  const copyTicket = () => {
    if (!successTicket) return;
    navigator.clipboard?.writeText(successTicket.ticket_number)
      .then(() => setToast({ type: "success", message: "Nomor tiket disalin!" }))
      .catch(() => setToast({ type: "error", message: "Gagal menyalin" }));
  };

  const style = `
    @keyframes slide { from { transform: translateY(-8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
    .animate-slide { animation: slide .22s ease; }
  `;

  return (
    <>
      <style>{style}</style>

      <section id="detail-acara" className="bg-blue-50/30 py-16">
        <div className="container mx-auto xxs:px-0 sm:px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Semua yang Perlu Kamu Tahu
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg justify-center">
              <Tabs aria-label="Detail acara" variant="default" className="justify-center">
                <TabItem active title="Lokasi" icon={HiLocationMarker}>
                  {/* Konten tab lokasi */}
                  <LocationTab setShowForm={setShowForm} />
                </TabItem>

                <TabItem title="Pendaftaran" icon={HiClipboardList}>
                  {/* Konten tab pendaftaran */}
                  <RegistrationTabProps setShowForm={setShowForm}  />
                </TabItem>

                <TabItem title="Rundown" icon={MdDashboard}>
                  {/* Konten tab rundown */}
                  <RundownTab />
                </TabItem>

                <TabItem title="Tata Tertib" icon={HiAdjustments}>
                  {/* Konten tab tata tertib */}
                  <RulesTab />
                </TabItem>
              </Tabs>
            </div>

            {/* Contact Footer */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mt-6">
              <ContactFooter />
            </div>
          </div>
        </div>
      </section>

      {/* Modal Components */}
      <RegistrationForm
        showForm={showForm}
        form={form}
        errors={errors}
        loading={loading}
        handleChange={handleChange}
        onSubmitForm={onSubmitForm}
        setShowForm={setShowForm}
      />

      <DonationModal
        showDonationDialog={showDonationDialog}
        donationAmount={donationAmount}
        bank={bank}
        loading={loading}
        uploadingProof={uploadingProof}
        handleDonationChange={handleDonationChange}
        setBank={setBank}
        setShowDonationDialog={setShowDonationDialog}
        confirmDonationAndRegister={confirmDonationAndRegister}
        setDonationAmount={setDonationAmount}
      />

      <SuccessModal
        successTicket={successTicket}
        setSuccessTicket={setSuccessTicket}
        copyTicket={copyTicket}
        setToast={setToast}
      />

      {/* Toast */}
      {toast && <Toast state={toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default Detail;
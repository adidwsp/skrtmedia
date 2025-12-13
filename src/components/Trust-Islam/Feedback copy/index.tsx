"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { 
  ChevronLeft, ChevronRight, Send, Camera, Users, 
  BookOpen, Coffee, Instagram, MessageCircle, Sparkles, Heart
} from "lucide-react";

// --- Palet Warna Baru (Berdasarkan Referensi Gambar) ---
const colors = {
  bg: "#F8F6F1",         // Cream terang background utama
  cardBg: "#FFFFFF",     // Putih bersih untuk kartu
  primary: "#8F9E8A",    // Sage Green (elegan, cerah)
  primaryDark: "#7A8B75", // Sage lebih gelap untuk hover
  accent: "#C8A164",     // Muted Gold/Orange (untuk highlight)
  textDark: "#4A4843",   // Charcoal/Coklat tua untuk teks utama
  textMuted: "#888681",  // Abu-abu hangat untuk teks sekunder
  border: "#EAE6DB",     // Garis batas halus
  stickyYellow: "#FEF9E7" // Warna kertas sticky note
};

// --- Tipe Data ---
type FeedbackData = {
  name: string;
  emoji_rating: number;
  best_moment: string;
  relevance_score: number;
  sticky_content: string;
};

type StickyNote = {
  id: number;
  sticky_content: string;
};

export default function ElegantFeedback() {
  const supabase = createClient();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [publicNotes, setPublicNotes] = useState<StickyNote[]>([]);
  
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    emoji_rating: 0,
    best_moment: "",
    relevance_score: 80,
    sticky_content: "",
  });

  // --- Logic Navigasi ---
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => { if (step > 0) setStep((prev) => prev - 1); };
  const handleChange = (field: keyof FeedbackData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  // --- Submit & Fetch Notes ---
  const handleSubmit = async () => {
    setLoading(true);
    // 1. Simpan data
    await supabase.from("feedback").insert([formData]);
    // 2. Ambil data sticky notes untuk Wall
    const { data } = await supabase
      .from("feedback").select("id, sticky_content")
      .neq("sticky_content", "").order("created_at", { ascending: false }).limit(15);
    if (data) setPublicNotes(data);
    setLoading(false);
    handleNext();
  };

  // --- Komponen UI Pembantu ---
  const NextButton = ({ disabled = false, onClick = handleNext, text = "Lanjut" }) => (
    <button onClick={onClick} disabled={disabled || loading} className="btn-primary w-full mt-6 group disabled:opacity-50 disabled:cursor-not-allowed">
      {loading ? "Memproses..." : text} 
      {!loading && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>}
    </button>
  );

  // --- Render Steps ---
  const renderStep = () => {
    switch (step) {
      case 0: // Intro & Nama
        return (
          <div className="space-y-8 text-center px-4">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{duration: 0.5}}
              className="inline-block p-4 rounded-full bg-[#8F9E8A]/10 mb-2">
              <Sparkles size={40} color={colors.primary} />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#4A4843] mb-3 leading-tight">Assalamu'alaikum,<br/>Sahabat Trust Islam.</h1>
              <p className="text-[#888681] text-lg">Terima kasih telah hadir. Sebelum kita berpisah, boleh kami tau nama panggilanmu?</p>
            </div>
            <div className="relative">
              <input type="text" placeholder="Ketik namamu disini..."
                className="w-full p-5 bg-transparent border-b-2 border-[#EAE6DB] text-center text-2xl font-medium text-[#4A4843] focus:outline-none focus:border-[#8F9E8A] transition-all placeholder-[#EAE6DB]"
                value={formData.name} onChange={(e) => handleChange("name", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && formData.name && handleNext()} autoFocus
              />
            </div>
            <AnimatePresence>
              {formData.name && (
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
                  <NextButton text="Mulai Cerita" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 1: // Emoji Rating
        const emojis = [
          { icon: "😣", val: 1, label: "Kurang" }, { icon: "😐", val: 2, label: "Biasa" },
          { icon: "🙂", val: 3, label: "Oke" }, { icon: "😁", val: 4, label: "Seru" }, { icon: "🤩", val: 5, label: "Pecah!" },
        ];
        return (
          <div className="space-y-10 text-center px-4">
             <h2 className="text-2xl font-bold text-[#4A4843] leading-relaxed">Hai {formData.name}! 👋 <br/>Gimana perasaanmu setelah ikut acara kemarin?</h2>
             <div className="flex justify-between items-end px-2 gap-2">
              {emojis.map((em) => (
                <button key={em.val} onClick={() => { handleChange("emoji_rating", em.val); setTimeout(handleNext, 400); }}
                  className={`flex flex-col items-center gap-3 transition-all duration-300 p-2 rounded-xl group ${
                    formData.emoji_rating === em.val ? "scale-110 -translate-y-2 bg-[#8F9E8A]/10" : "hover:scale-110 hover:bg-[#F8F6F1] opacity-60 hover:opacity-100"
                  }`}>
                  <span className="text-5xl md:text-6xl drop-shadow-sm filter grayscale-[30%] group-hover:grayscale-0 transition-all">{em.icon}</span>
                  <span className={`text-sm font-medium transition-colors ${formData.emoji_rating === em.val ? "text-[#8F9E8A]" : "text-[#888681]"}`}>{em.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2: // Best Moment (Cards)
        const moments = [
          { id: "spot", label: "Venue & Suasana", icon: <Coffee size={28}/> },
          { id: "friends", label: "Ukhuwah Teman Baru", icon: <Users size={28}/> },
          { id: "materi", label: "Isi Materi Kajian", icon: <BookOpen size={28}/> },
          { id: "vibe", label: "Vibe Positifnya", icon: <Sparkles size={28}/> },
        ];
        return (
          <div className="space-y-8 px-4">
            <div className="text-center space-y-2">
               <h2 className="text-2xl font-bold text-[#4A4843]">Satu hal yang paling "ngena"?</h2>
               <p className="text-[#888681]">Pilih momen yang bikin kamu susah *move-on*.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {moments.map((m) => (
                <button key={m.id} onClick={() => { handleChange("best_moment", m.label); setTimeout(handleNext, 300); }}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-4 transition-all duration-300 h-36 group ${
                    formData.best_moment === m.label
                      ? "bg-[#8F9E8A] border-[#8F9E8A] text-white shadow-lg shadow-[#8F9E8A]/30 scale-[1.02]"
                      : "bg-white border-[#EAE6DB] text-[#888681] hover:border-[#8F9E8A]/50 hover:text-[#8F9E8A] hover:bg-[#F8F6F1]"
                  }`}>
                  <div className={`transition-transform group-hover:scale-110 ${formData.best_moment === m.label ? "text-white" : "text-[#8F9E8A]"}`}>{m.icon}</div>
                  <span className="font-semibold text-sm text-center leading-tight">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3: // Relevansi (Slider)
        return (
          <div className="space-y-12 text-center px-6 py-8">
             <h2 className="text-2xl font-bold text-[#4A4843] leading-relaxed">Seberapa "Relate" materi kemarin dengan kondisi hidupmu saat ini?</h2>
            <div className="relative py-10 px-2">
              {/* Custom Range Slider Visualization */}
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-[#EAE6DB] rounded-full -translate-y-1/2 overflow-hidden">
                 <motion.div className="h-full bg-gradient-to-r from-[#D0D8CC] to-[#8F9E8A]" style={{ width: `${formData.relevance_score}%` }} />
              </div>
              <input type="range" min="0" max="100" value={formData.relevance_score}
                onChange={(e) => handleChange("relevance_score", parseInt(e.target.value))}
                className="relative z-10 w-full h-2 opacity-0 cursor-pointer"
              />
               {/* Custom Thumb & Label */}
               <motion.div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
                style={{ left: `${formData.relevance_score}%` }}
                animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                 <div className="w-8 h-8 bg-[#8F9E8A] border-4 border-white rounded-full shadow-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                 </div>
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#C8A164] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm whitespace-nowrap">
                  {formData.relevance_score}%
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C8A164] rotate-45"></div>
                 </div>
               </motion.div>

              <div className="flex justify-between text-xs text-[#888681] mt-6 font-medium px-1">
                <span>Kurang Relevan</span>
                <span>Sangat Relate!</span>
              </div>
            </div>
            <NextButton />
          </div>
        );

      case 4: // Sticky Notes (Refleksi)
        return (
          <div className="space-y-8 px-4">
            <div className="text-center space-y-3">
              <Heart size={32} className="mx-auto text-[#C8A164]" fill={colors.accent}/>
              <h2 className="text-2xl font-bold text-[#4A4843]">Sticky Note of Hope</h2>
              <p className="text-[#888681] leading-relaxed">
                Tuliskan satu <b>harapan</b> atau <b>keresahan</b> yang ingin kamu lepaskan hari ini. Biarkan ia tertulis disini.
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-[#EAE6DB] rounded-sm transform rotate-2 translate-y-2 translate-x-2 transition-transform group-hover:rotate-3 group-hover:translate-y-3 group-hover:translate-x-3"></div>
              <div className="relative bg-[#FEF9E7] p-6 rounded-sm shadow-sm border-t-[6px] border-[#E3D5A8] min-h-[220px] flex flex-col transition-all group-hover:-translate-y-1">
                <textarea
                  placeholder="Ya Allah, izinkanlah aku untuk istiqomah..."
                  className="w-full flex-1 bg-transparent resize-none focus:outline-none text-[#4A4843] font-handwriting text-xl leading-relaxed placeholder-[#4A4843]/30"
                  value={formData.sticky_content}
                  onChange={(e) => handleChange("sticky_content", e.target.value)}
                />
                <div className="text-right text-xs text-[#888681]/60 italic mt-3 flex items-center justify-end gap-1">
                   <Sparkles size={12}/> Note ini anonim di Wall
                </div>
              </div>
            </div>
            <NextButton onClick={handleSubmit} disabled={!formData.sticky_content} text="Tempel di Wall" />
          </div>
        );

      case 5: // The Wall & Final CTA (Persuasive)
        return (
          <div className="space-y-10">
            {/* Sticky Notes Wall */}
            <div className="space-y-4 px-4">
              <div className="text-center mb-6">
                 <h2 className="text-2xl font-bold text-[#4A4843] flex items-center justify-center gap-2">
                    <Users className="text-[#8F9E8A]"/> Wall of Trust.
                 </h2>
                 <p className="text-sm text-[#888681]">Kamu tidak sendirian. Lihatlah hati yang berjuang bersamamu.</p>
              </div>
              <div className="h-72 overflow-y-auto pr-2 space-y-4 custom-scrollbar bg-[#F8F6F1] p-4 rounded-2xl border-2 border-[#EAE6DB]/50 shadow-inner">
                <div className="grid grid-cols-2 gap-4">
                  {publicNotes.map((note, idx) => {
                    const rotation = idx % 2 === 0 ? 'rotate-1' : '-rotate-2';
                    const bgColor = idx % 3 === 0 ? 'bg-[#FEF9E7]' : idx % 3 === 1 ? 'bg-[#EDF4EB]' : 'bg-[#F3F0FF]';
                    return (
                    <motion.div key={note.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                      className={`p-4 rounded-sm shadow-sm text-sm leading-relaxed text-[#4A4843] font-handwriting ${rotation} ${bgColor} border-t-4 border-black/5`}>
                      "{note.sticky_content}"
                    </motion.div>
                  )})}
                </div>
              </div>
            </div>

            {/* --- FINAL CALL TO ACTION (PERSUASIVE UI) --- */}
            <div className="relative overflow-hidden rounded-t-[40px] bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-8 md:p-10 mt-8">
               {/* Decorative Background Elements */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8F9E8A]/20 to-[#C8A164]/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#8F9E8A]/10 to-transparent blur-2xl rounded-full -ml-10 -mb-10 pointer-events-none"></div>

               <div className="relative z-10 text-center space-y-6">
                  <div>
                     <h3 className="text-2xl md:text-3xl font-bold text-[#4A4843] mb-3 leading-tight">
                        Jangan Biarkan<br/><span className="text-[#8F9E8A]">Hangatnya Pudar.</span>
                     </h3>
                     <p className="text-[#888681] leading-relaxed md:px-8">
                        Sendirian itu berat. Kita butuh "rumah" untuk saling menjaga nyala iman agar tidak padam diterpa angin.
                        <br/><br/>
                        <span className="font-medium text-[#4A4843]">Mari bertumbuh bersama di lingkaran Skrtmedia.</span>
                     </p>
                  </div>

                  <div className="space-y-3 pt-4">
                     <a href="https://instagram.com/skrtmedia" target="_blank" 
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#8F9E8A] text-white font-bold rounded-xl shadow-lg shadow-[#8F9E8A]/20 hover:bg-[#7A8B75] hover:scale-[1.02] transition-all group">
                        <Instagram size={22} className="group-hover:rotate-12 transition-transform"/> 
                        Follow Instagram Skrtmedia
                     </a>
                     <a href="https://wa.me/62812345678" target="_blank" 
                        className="flex items-center justify-center gap-3 w-full py-4 bg-white border-2 border-[#8F9E8A] text-[#8F9E8A] font-semibold rounded-xl hover:bg-[#8F9E8A]/5 transition-all">
                        <MessageCircle size={22}/> Hubungi Admin
                     </a>
                  </div>
               </div>
            </div>

            {/* Media Partners Footer */}
            <div className="text-center pb-8 px-6 bg-white">
              <p className="text-xs text-[#888681]/70 mb-3 uppercase tracking-wider font-medium">Partner Kebaikan Kami</p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                 <a href="https://instagram.com/odojkarawang" target="_blank" className="text-sm font-bold text-[#8F9E8A] hover:text-[#C8A164] transition-colors">@OdojKarawang</a>
                 <span className="text-[#EAE6DB]">•</span>
                 <a href="https://instagram.com/hallomuslimahid" target="_blank" className="text-sm font-bold text-[#8F9E8A] hover:text-[#C8A164] transition-colors">@HalloMuslimahId</a>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    // Container Utama dengan Background Cream Cerah
    <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center p-4 md:p-6 font-sans selection:bg-[#8F9E8A]/20">
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-xl shadow-[#8F9E8A]/5 overflow-hidden relative min-h-[650px] flex flex-col border border-[#EAE6DB]/50">
        
        {/* Progress Bar Sage Green */}
        <div className="h-1.5 bg-[#EAE6DB]/50 w-full">
          <motion.div className="h-full bg-[#8F9E8A]" initial={{ width: 0 }} animate={{ width: `${((step + 1) / 6) * 100}%` }} transition={{duration: 0.5, ease: "easeInOut"}}/>
        </div>

        {/* Top Nav */}
        <div className="px-6 pt-6 flex items-center justify-between h-16">
          {step > 0 && step < 5 ? (
            <button onClick={handleBack} className="p-2 -ml-2 hover:bg-[#F8F6F1] rounded-full text-[#888681] hover:text-[#4A4843] transition-colors">
              <ChevronLeft size={26} />
            </button>
          ) : <div></div>}
          <div className="text-xs font-medium text-[#888681]/50 uppercase tracking-widest">{step < 5 && `Step ${step+1} of 5`}</div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full">
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Global Styles & Font Injection */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Patrick+Hand&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-handwriting { font-family: 'Patrick Hand', cursive; }

        .btn-primary {
          @apply bg-[#8F9E8A] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg shadow-[#8F9E8A]/25 hover:bg-[#7A8B75] hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-3;
        }
        
        /* Custom Scrollbar untuk Wall */
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #D0D8CC; border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #8F9E8A; }
      `}</style>
    </div>
  );
}
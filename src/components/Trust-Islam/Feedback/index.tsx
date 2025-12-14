"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { 
  ChevronLeft, ChevronRight, Send, Camera, Users, 
  BookOpen, Coffee, Instagram, MessageCircle, Heart,
  Mic, MessageSquare, PenTool, Lightbulb, Mail, Check,
  Star, AlertCircle, ThumbsUp, HelpCircle,
  Sparkles, ArrowRight, Sun, Moon, Cloud
} from "lucide-react";
import { FaPray } from "react-icons/fa";

// --- Setup Supabase ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Tipe Data ---
type FeedbackData = {
  name?: string;
  emoji_rating: number;
  best_moment: string;
  relevance_score: number;
  sticky_content: string;
  criticism?: string;
  suggestion?: string;
  rating_overall?: number;
  instagram_followed?: boolean;
  contact_interest?: boolean;
};

type StickyNote = {
  id: number;
  sticky_content: string;
  name: string;
  created_at: string;
};

export default function TrustIslamFeedback() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [publicNotes, setPublicNotes] = useState<StickyNote[]>([]);
  const [responseId, setResponseId] = useState<number | null>(null);
  const [instagramSkrtFollowed, setInstagramSkrtFollowed] = useState(false);
  const [instagramOdojFollowed, setInstagramOdojFollowed] = useState(false);
  const [instagramHmFollowed, setInstagramHmFollowed] = useState(false);
  const [contactInterest, setContactInterest] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  
  const [formData, setFormData] = useState<FeedbackData>({
    emoji_rating: 3,
    best_moment: "",
    relevance_score: 50,
    sticky_content: "",
    rating_overall: 5,
    criticism: "",
    suggestion: "",
  });

  // Fetch public notes on component mount
  useEffect(() => {
    fetchPublicNotes();
    
    // Efek sparkles interval
    const interval = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchPublicNotes = async () => {
    const { data } = await supabase
      .from("feedback")
      .select("id, sticky_content, name, created_at")
      .not("sticky_content", "eq", "")
      .order("created_at", { ascending: false })
      .limit(12);
    
    if (data) setPublicNotes(data);
  };

  // --- Logic Navigasi ---
  const handleNext = () => {
    // Tambahkan efek suara atau animasi
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleChange = (field: keyof FeedbackData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  // --- Submit & Fetch Notes ---
  const handleSubmit = async () => {
    if (!formData.sticky_content.trim()) {
      alert("Silakan tulis harapan atau keresahanmu terlebih dahulu");
      return;
    }

    setLoading(true);
    
    try {
      // 1. Simpan data user ke Supabase
      const { data, error } = await supabase
        .from("feedback")
        .insert([{
          emoji_rating: formData.emoji_rating,
          best_moment: formData.best_moment,
          relevance_score: formData.relevance_score,
          sticky_content: formData.sticky_content,
          name: formData.name || "Anonim",
          rating_overall: formData.rating_overall,
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setResponseId(data.id);
        
        // 2. Ambil data sticky notes orang lain untuk ditampilkan di Wall
        await fetchPublicNotes();
      }
      
      setLoading(false);
      handleNext();
    } catch (error) {
      console.error("Error saving feedback:", error);
      setLoading(false);
    }
  };

  // --- Submit Kritik & Saran ---
  // const handleSubmitCriticism = async () => {
  //   if (!formData.criticism?.trim() && !formData.suggestion?.trim()) {
  //     alert("Silakan isi kritik atau saran terlebih dahulu, atau klik 'Lewati'");
  //     return;
  //   }

  //   setLoading(true);
    
  //   try {
  //     // Update data dengan kritik dan saran
  //     if (responseId) {
  //       await supabase
  //         .from("feedback")
  //         .update({ 
  //           criticism: formData.criticism,
  //           suggestion: formData.suggestion
  //         })
  //         .eq("id", responseId);
  //     }
      
  //     setLoading(false);
  //     handleNext(); // Lanjut ke halaman hasil
  //   } catch (error) {
  //     console.error("Error saving criticism:", error);
  //     setLoading(false);
  //   }
  // };
  const handleSubmitCriticism = async () => {
    if (!responseId) {
      alert("Error: Data tidak ditemukan. Silakan mulai dari awal.");
      return;
    }

    setLoading(true);
    
    try {
      // Gunakan upsert untuk update atau create
      const { data, error } = await supabase
        .from("feedback")
        .upsert({
          id: responseId, // Pastikan ID ada
          criticism: formData.criticism,
          suggestion: formData.suggestion,
          rating_overall: formData.rating_overall,
          updated_at: new Date().toISOString() // Tambahkan timestamp
        })
        .select()
        .single();

      if (error) throw error;
      
      setLoading(false);
      handleNext();
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  // --- Social Actions ---
  const handleInstagramClickSkrt = async () => {
    window.open("https://instagram.com/skrtmedia.id", "_blank");
    setInstagramSkrtFollowed(true);
    
    if (responseId) {
      await supabase
        .from("feedback")
        .update({ instagram_followed: true })
        .eq("id", responseId);
    }
  };
  const handleInstagramClickOdoj = async () => {
    window.open("https://instagram.com/odojkarawang", "_blank");
    setInstagramOdojFollowed(true);
    
    if (responseId) {
      await supabase
        .from("feedback")
        .update({ instagram_followed: true })
        .eq("id", responseId);
    }
  };
  const handleInstagramClickHm = async () => {
    window.open("https://instagram.com/hallomuslimahid", "_blank");
    setInstagramHmFollowed(true);
    
    if (responseId) {
      await supabase
        .from("feedback")
        .update({ instagram_followed: true })
        .eq("id", responseId);
    }
  };

  const handleContactClick = async () => {
    window.open("https://wa.me/6289647011970", "_blank");
    setContactInterest(true);
    
    if (responseId) {
      await supabase
        .from("feedback")
        .update({ contact_interest: true })
        .eq("id", responseId);
    }
  };

  // --- Interaktivitas Tambahan ---
  const handleStickyNoteClick = () => {
    // Tambahkan efek animasi pada sticky note
    if (typeof window !== 'undefined') {
      const audio = new Audio('/click-sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  // --- Render Steps ---
  const renderStep = () => {
    switch (step) {
      case 0: // Intro
        return (
          <div className="space-y-6 text-center">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center text-white shadow-2xl shadow-emerald-200">
                <Heart className="w-12 h-12" />
              </div>
              {showSparkles && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </motion.div>
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-emerald-900"
            >
              Trust is Lam: Refleksi Kita
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-emerald-700"
            >
              Terima kasih sudah menjadi bagian dari event kita di Wardes.
            </motion.p>
            
            
            {/* <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { icon: "📸", label: "Spot Foto", color: "from-amber-100 to-amber-50" },
                { icon: "📝", label: "Sticky Notes", color: "from-emerald-100 to-emerald-50" },
                { icon: "☕", label: "Lesehan", color: "from-amber-100 to-amber-50" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm font-medium text-emerald-800">{item.label}</p>
                </motion.div>
              ))}
            </motion.div> */}
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 w-full flex items-center justify-center gap-3 mt-8"
            >
              <span className="flex items-center gap-2">
                Mulai Refleksi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-emerald-600 mt-4"
            >
              <span className="inline-flex items-center gap-1">
                <Sun className="w-4 h-4" />
                Bersama kita bertumbuh
                <Moon className="w-4 h-4 ml-2" />
              </span>
            </motion.p>
          </div>
        );

      case 1: // Nama (Opsional)
        return (
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-2xl mx-auto flex items-center justify-center text-emerald-800 mb-4"
            >
              <Users className="w-8 h-8" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-emerald-900">Siapa nama panggilanmu?</h2>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Tulis nama panggilanmu di sini"
                className="w-full p-4 bg-white/80 border-2 border-emerald-200 rounded-xl text-center text-xl text-emerald-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all placeholder-emerald-400"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                autoFocus
              />
              <motion.div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 ${formData.name ? 'opacity-100' : 'opacity-0'}`}
                animate={{ rotate: formData.name ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Check className="w-5 h-5" />
              </motion.div>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
            >
              {formData.name ? (
                <>
                  Lanjut, {formData.name}
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                "Lanjut Tanpa Nama"
              )}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        );

      case 2: // Emoji Rating
        const emojis = [
          { icon: "😔", val: 1, label: "Sedih", color: "from-blue-100 to-blue-200" },
          { icon: "😐", val: 2, label: "Biasa", color: "from-gray-100 to-gray-200" },
          { icon: "🙂", val: 3, label: "Senang", color: "from-emerald-100 to-emerald-200" },
          { icon: "😊", val: 4, label: "Sangat Senang", color: "from-emerald-200 to-emerald-300" },
          { icon: "🤩", val: 5, label: "Luar Biasa!", color: "from-yellow-100 to-amber-200" },
        ];
        
        return (
          <div className="space-y-8 text-center">
            <h2 className="text-2xl font-bold text-emerald-900">
              Secara keseluruhan, bagaimana perasaanmu setelah Trust is Lam?
            </h2>
            <p className="text-emerald-700">Pilih yang paling sesuai dengan hatimu</p>
            
            <div className="flex justify-between items-end px-2">
              {emojis.map((em) => (
                <motion.button
                  key={em.val}
                  initial={{ y: 0 }}
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    handleChange("emoji_rating", em.val);
                    setTimeout(handleNext, 400);
                  }}
                  className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                    formData.emoji_rating === em.val 
                      ? "scale-125 -translate-y-2" 
                      : "hover:scale-110"
                  }`}
                >
                  <motion.div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${em.color} ${
                      formData.emoji_rating === em.val ? "shadow-lg ring-2 ring-emerald-400" : "shadow-md"
                    }`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-2xl md:text-3xl">{em.icon}</span>
                  </motion.div>
                  <span className="text-xs font-medium text-emerald-700">{em.label}</span>
                </motion.button>
              ))}
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-2xl border border-emerald-100"
            >
              <div className="text-5xl mb-2">
                {emojis.find(e => e.val === formData.emoji_rating)?.icon}
              </div>
              <p className="text-xl font-bold text-emerald-800">
                {emojis.find(e => e.val === formData.emoji_rating)?.label}
              </p>
              <p className="text-sm text-emerald-600 mt-2">
                Terima kasih sudah jujur dengan perasaanmu!
              </p>
            </motion.div>
          </div>
        );

      case 3: // Best Moment (Pilihan Ganda Visual)
        const moments = [
          { id: "photo", label: "Spot foto kekinian", icon: <Camera className="w-6 h-6" />, color: "from-purple-100 to-pink-100" },
          { id: "muhasabah", label: "Muhasabah", icon: <FaPray className="w-6 h-6" />, color: "from-amber-100 to-yellow-100" },
          { id: "podcast", label: "Sesi materi Ustadz Junjun", icon: <Mic className="w-6 h-6" />, color: "from-blue-100 to-cyan-100" },
          { id: "atmosphere", label: "Suasana Wardes", icon: <Coffee className="w-6 h-6" />, color: "from-emerald-100 to-green-100" },
          { id: "discussion", label: "Diskusi dengan teman baru", icon: <MessageSquare className="w-6 h-6" />, color: "from-indigo-100 to-violet-100" },
          { id: "materi", label: "Isi Materi", icon: <BookOpen className="w-6 h-6" />, color: "from-rose-100 to-red-100" },
        ];
        
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-900 text-center">
              Apa satu hal yang paling kamu ingat dari kajian kemarin?
            </h2>
            <p className="text-emerald-700 text-center">Pilih yang paling berkesan</p>
            
            <div className="grid grid-cols-2 gap-3">
              {moments.map((m) => (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleChange("best_moment", m.label);
                    setTimeout(handleNext, 300);
                  }}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all h-full ${
                    formData.best_moment === m.label
                      ? `border-emerald-500 bg-gradient-to-br ${m.color} shadow-lg`
                      : "border-emerald-100 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${m.color}`}>
                    {m.icon}
                  </div>
                  <span className="font-medium text-sm text-center text-emerald-800">{m.label}</span>
                </motion.button>
              ))}
            </div>
            
            {formData.best_moment && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4 p-3 bg-emerald-50 rounded-xl"
              >
                <p className="text-emerald-700 font-medium">
                  <span className="text-emerald-900">Pilihanmu:</span> {formData.best_moment}
                </p>
              </motion.div>
            )}
          </div>
        );

      case 4: // Relevansi (Slider Interaktif)
        const relevanceLabels = [
          { score: 0, label: "Tidak relevan", color: "text-red-500" },
          { score: 25, label: "Kurang relevan", color: "text-orange-500" },
          { score: 50, label: "Cukup relevan", color: "text-yellow-500" },
          { score: 75, label: "Relevan", color: "text-emerald-500" },
          { score: 100, label: "Sangat relevan!", color: "text-emerald-600" },
        ];
        
        const getRelevanceLabel = (score: number) => {
          if (score < 20) return relevanceLabels[0];
          if (score < 40) return relevanceLabels[1];
          if (score < 60) return relevanceLabels[2];
          if (score < 80) return relevanceLabels[3];
          return relevanceLabels[4];
        };
        
        const currentLabel = getRelevanceLabel(formData.relevance_score);
        
        return (
          <div className="space-y-8 text-center">
            <h2 className="text-2xl font-bold text-emerald-900">
              Menurutmu, apakah materi 'Trust is Lam' relevan dengan keresahanmu sehari-hari?
            </h2>
            <p className="text-emerald-700">Geser slider sesuai pengalamanmu</p>
            
            <div className="relative py-8 px-4">
              <div className="relative mb-10">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.relevance_score}
                  onChange={(e) => handleChange("relevance_score", parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-emerald-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-emerald-500 [&::-webkit-slider-thumb]:shadow-lg"
                />
                
                <motion.div
                  className="absolute top-0 transform -translate-x-1/2 -translate-y-full"
                  style={{ left: `${formData.relevance_score}%` }}
                  animate={{ 
                    y: [0, -5, 0],
                    transition: { repeat: Infinity, duration: 2 }
                  }}
                >
                  <div className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg relative">
                    {formData.relevance_score}%
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-emerald-600 rotate-45"></div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex justify-between text-sm text-emerald-600 font-medium">
                <span>😔 Tidak</span>
                <span>😐 Lumayan</span>
                <span>😊 Sangat!</span>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`mt-8 p-6 rounded-2xl bg-gradient-to-r ${currentLabel.color.replace('text-', 'bg-')}/10 border border-${currentLabel.color.replace('text-', '')}/20`}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Lightbulb className={`w-6 h-6 ${currentLabel.color}`} />
                <h3 className={`text-xl font-bold ${currentLabel.color}`}>
                  {currentLabel.label}
                </h3>
              </div>
              <p className="text-emerald-700">
                {formData.relevance_score >= 60 
                  ? "Alhamdulillah, materi cocok dengan kondisimu! Semoga menjadi solusi."
                  : "Terima kasih atas kejujuranmu ❤️ Kajian berikutnya akan lebih baik."
                }
              </p>
            </motion.div>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
            >
              Lanjut ke Sticky Notes
              <PenTool className="w-4 h-4" />
            </motion.button>
          </div>
        );

      case 5: // Sticky Notes (Interaktif)
        const sampleNotes = [
          { text: "Ingin lebih dekat dengan Allah", emoji: "🕌" },
          { text: "Cari teman diskusi agama", emoji: "👥" },
          { text: "Pengen ikut kajian lagi", emoji: "📚" },
          { text: "Butuh lingkungan yang positif", emoji: "🌱" },
          { text: "Ingin konsisten ibadah", emoji: "🕋" },
          { text: "Cari solusi masalah hati", emoji: "💖" },
        ];
        
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-emerald-900">Jika kamu boleh menuliskan satu harapan atau keresahan saat ini...</h2>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Tulis di sticky notes digital ini (akan tampil anonim bersama yang lain)
              </p>
            </div>
            
            <motion.div
              initial={{ rotate: -2, y: 20, opacity: 0 }}
              animate={{ rotate: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              onClick={handleStickyNoteClick}
              className="bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50 p-6 rounded-xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)] min-h-[250px] flex flex-col border-2 border-amber-200 relative cursor-text"
            >
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-300 rounded-full opacity-70"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full opacity-70"></div>
              
              <textarea
                placeholder="Tulis harapan atau keresahanmu di sini... ✨"
                className="w-full flex-1 bg-transparent resize-none focus:outline-none text-emerald-900 font-handwriting text-xl leading-relaxed placeholder-amber-400/70"
                value={formData.sticky_content}
                onChange={(e) => handleChange("sticky_content", e.target.value)}
                maxLength={500}
                style={{ fontFamily: '"Caveat", cursive' }}
              />
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-amber-200/50">
                <div className="text-xs text-amber-700">
                  Note ini akan tampil anonim di Wall of Hope
                </div>
                <div className={`text-sm font-medium ${
                  formData.sticky_content.length > 450 ? 'text-red-500' : 'text-amber-700'
                }`}>
                  {formData.sticky_content.length}/500
                </div>
              </div>
            </motion.div>

            <div>
              <p className="text-sm text-emerald-600 mb-3 text-center">Klik untuk contoh:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {sampleNotes.map((sample, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleChange("sticky_content", sample.text);
                      // Tambahkan efek visual
                      const button = document.querySelector(`#sample-${idx}`);
                      if (button) {
                        button.classList.add('ring-2', 'ring-emerald-400');
                        setTimeout(() => {
                          button.classList.remove('ring-2', 'ring-emerald-400');
                        }, 300);
                      }
                    }}
                    id={`sample-${idx}`}
                    className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium hover:bg-emerald-100 transition-all flex items-center gap-2 border border-emerald-200"
                  >
                    <span>{sample.emoji}</span>
                    <span>{sample.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(251, 191, 36, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit} 
              disabled={loading || !formData.sticky_content.trim()}
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Cloud className="w-5 h-5" />
                  </motion.div>
                  Menyimpan harapanmu...
                </>
              ) : (
                <>
                  Tempel di Wall of Hope
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
            
            <p className="text-xs text-emerald-500 text-center mt-2">
              💫 "Doa yang dipanjatkan dengan jujur adalah kekuatan terbesar"
            </p>
          </div>
        );

      case 6: // Kritik & Saran
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center text-white mb-4 shadow-lg">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-900">Bantu Kami Jadi Lebih Baik</h2>
              <p className="text-emerald-700">Kritik dan saranmu sangat berharga untuk kajian selanjutnya</p>
            </motion.div>

            {/* Overall Rating */}
            <div className="space-y-4">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Seberapa puas kamu dengan acara ini?
              </h3>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleChange("rating_overall", rating)}
                    className={`text-3xl transition-all ${
                      formData.rating_overall && rating <= formData.rating_overall
                        ? "text-amber-500 scale-110"
                        : "text-emerald-200 hover:text-amber-300"
                    }`}
                  >
                    ★
                  </motion.button>
                ))}
              </div>
              <div className="text-center text-sm font-medium text-emerald-700">
                {formData.rating_overall === 1 && "Kurang puas 😔"}
                {formData.rating_overall === 2 && "Biasa saja 😐"}
                {formData.rating_overall === 3 && "Cukup puas 🙂"}
                {formData.rating_overall === 4 && "Puas 😊"}
                {formData.rating_overall === 5 && "Sangat puas! 🤩"}
              </div>
            </div>

            {/* Kritik */}
            <div className="space-y-3">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-rose-500" />
                Apa yang bisa kami perbaiki?
              </h3>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                placeholder="Misal: Durasi terlalu panjang, sound system kurang jelas, ingin lebih banyak diskusi..."
                className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 text-emerald-900 min-h-[100px] resize-none transition-all"
                value={formData.criticism || ""}
                onChange={(e) => handleChange("criticism", e.target.value)}
              />
              <p className="text-xs text-emerald-600">
                Kami siap menerima kritik konstruktif untuk perbaikan
              </p>
            </div>

            {/* Saran */}
            <div className="space-y-3">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-emerald-500" />
                Saran untuk kajian berikutnya?
              </h3>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                placeholder="Misal: Pengen tema tentang..., Mau lokasi di..., Ingin sesi Q&A lebih lama, permintaan pemateri..."
                className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 text-emerald-900 min-h-[100px] resize-none transition-all"
                value={formData.suggestion || ""}
                onChange={(e) => handleChange("suggestion", e.target.value)}
              />
              <p className="text-xs text-emerald-600">
                Ide kreatifmu sangat berarti untuk perkembangan SKRT
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNext()}
                className="flex-1 py-3.5 rounded-xl font-semibold border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all"
              >
                Lewati
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitCriticism}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    Kirim
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-emerald-50 to-amber-50 p-4 rounded-xl border border-emerald-100"
            >
              <p className="text-sm text-emerald-700 text-center">
                ❤️ Terima kasih sudah meluangkan waktu untuk memberikan masukan.
                <br />
                Ini akan membantu kami menciptakan kajian yang lebih bermakna.
              </p>
            </motion.div>
          </div>
        );

      case 7: // The Wall & CTA (Interaktif)
        return (
          <div className="space-y-8">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <div className="relative inline-block mb-4">
                <Heart className="w-14 h-14 text-emerald-600 animate-pulse" />
                {showSparkles && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-1">Terima kasih sudah berbagi cerita</h2>
              <p className="text-emerald-700">Kamu nggak sendiri. Banyak yang merasakan hal serupa ❤️</p>
            </motion.div>

            {/* Harapan & Keresahan Teman-teman */}
            <div>
              <h3 className="text-lg font-bold text-emerald-900 mb-4 text-center flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Wall of Hope
              </h3>
              <div className="h-64 overflow-y-auto pr-2 space-y-4 custom-scrollbar bg-gradient-to-b from-emerald-50 to-amber-50 p-4 rounded-2xl border border-emerald-100 shadow-inner">
                <div className="grid grid-cols-2 gap-3">
                  {publicNotes.map((note, idx) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ 
                        rotate: idx % 2 === 0 ? 2 : -2,
                        y: -5 
                      }}
                      className="p-3 rounded-xl shadow-sm text-sm leading-relaxed text-emerald-900 bg-gradient-to-br from-amber-50 to-yellow-50"
                      style={{ 
                        borderTop: '6px solid #FBBF24',
                        boxShadow: '2px 4px 12px rgba(0,0,0,0.08)'
                      }}
                    >
                      <div className="font-handwriting" style={{ fontFamily: '"Caveat", cursive' }}>
                        "{note.sticky_content}"
                      </div>
                      {/* <div className="text-xs text-emerald-600 mt-2 text-right">— anonim</div> */}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tombol untuk membuka halaman terpisah */}
              <Link 
                href="/trust-islam/feedback/wall-of-hope"
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Kunjungi Wall of Hope
              </Link>

            {/* Pesan Transisi */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl text-center shadow-xl border border-emerald-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center text-white mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900 mb-2">Kita memang nggak bisa sendiri</h3>
              <p className="text-sm text-emerald-700 mb-4">
                Butuh wadah untuk saling menguatkan, belajar, dan tumbuh bersama
              </p>
              <div className="text-emerald-600 font-bold text-sm">
                SKRT: Sempat Kelam, Resah Tinggalkan
              </div>
            </motion.div>

            {/* Ajakan Bergabung */}
            <div>
              <h3 className="text-lg font-bold text-emerald-900 mb-4 text-center">
                Mari terus terhubung!
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Instagram Card */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstagramClickSkrt}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    instagramSkrtFollowed
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50'
                      : 'border-emerald-200 bg-white hover:border-emerald-400'
                  } shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Instagram className={`w-8 h-8 ${
                      instagramSkrtFollowed ? 'text-emerald-600' : 'text-pink-500'
                    }`} />
                  </div>
                  <h4 className="font-bold text-sm text-emerald-900 mb-1">
                    {instagramSkrtFollowed ? 'Sudah Difollow! 🎉' : 'Follow Instagram'}
                  </h4>
                  <p className="text-xs text-emerald-600">@skrtmedia.id</p>
                  {instagramSkrtFollowed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 text-emerald-600 text-xs flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 mr-1" /> Terima kasih!
                    </motion.div>
                  )}
                </motion.button>

                {/* WhatsApp Card */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContactClick}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    contactInterest
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50'
                      : 'border-emerald-200 bg-white hover:border-emerald-400'
                  } shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className={`w-8 h-8 ${
                      contactInterest ? 'text-emerald-600' : 'text-emerald-500'
                    }`} />
                  </div>
                  <h4 className="font-bold text-sm text-emerald-900 mb-1">
                    {contactInterest ? 'Admin Akan Membalas! 💬' : 'Chat Admin SKRT'}
                  </h4>
                  <p className="text-xs text-emerald-600">+62 896-4701-1970</p>
                  {contactInterest && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 text-emerald-600 text-xs flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 mr-1" /> Tunggu ya!
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Media Partner */}
            <div>
              <h3 className="text-lg font-bold text-emerald-900 mb-4 text-center">
                Terima kasih kepada Media Partner
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Instagram Card */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstagramClickOdoj}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    instagramOdojFollowed
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50'
                      : 'border-emerald-200 bg-white hover:border-emerald-400'
                  } shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Instagram className={`w-8 h-8 ${
                      instagramOdojFollowed ? 'text-emerald-600' : 'text-pink-500'
                    }`} />
                  </div>
                  <h4 className="font-bold text-sm text-emerald-900 mb-1">
                    {instagramOdojFollowed ? 'Sudah Difollow! 🎉' : 'Follow Instagram'}
                  </h4>
                  <p className="text-xs text-emerald-600">@odojkarawang</p>
                  {instagramOdojFollowed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 text-emerald-600 text-xs flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 mr-1" /> Terima kasih!
                    </motion.div>
                  )}
                </motion.button>

                {/* Instagram Card */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstagramClickHm}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    instagramHmFollowed
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50'
                      : 'border-emerald-200 bg-white hover:border-emerald-400'
                  } shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Instagram className={`w-8 h-8 ${
                      instagramHmFollowed ? 'text-emerald-600' : 'text-pink-500'
                    }`} />
                  </div>
                  <h4 className="font-bold text-sm text-emerald-900 mb-1">
                    {instagramHmFollowed ? 'Sudah Difollow! 🎉' : 'Follow Instagram'}
                  </h4>
                  <p className="text-xs text-emerald-600">@hallomuslimahid</p>
                  {instagramHmFollowed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 text-emerald-600 text-xs flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 mr-1" /> Terima kasih!
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Quotes Penutup */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center border-t border-emerald-200 pt-6"
            >
              <div className="text-2xl font-handwriting text-emerald-900 mb-4" style={{ fontFamily: '"Caveat", cursive' }}>
                "Trust is Lam bukan akhir. Ini baru awal perjalanan kita."
              </div>
              <p className="text-sm text-emerald-700 mb-6">
                SKRT hadir sebagai wadah untukmu yang ingin tumbuh dalam iman, ilmu, dan ukhuwah.
              </p>
              <div className="bg-gradient-to-r from-emerald-50 to-transparent p-4 rounded-2xl border border-emerald-100">
                <p className="font-bold text-emerald-900 text-lg">
                  Sampai jumpa di kajian berikutnya! ❤️
                </p>
                <p className="text-xs text-emerald-600 mt-2">
                  skrtmedia.id | Sempat Kelam, Resah Tinggalkan
                </p>
              </div>
            </motion.div>

            {/* Button Restart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStep(0);
                  setFormData({
                    emoji_rating: 3,
                    best_moment: "",
                    relevance_score: 50,
                    sticky_content: "",
                    rating_overall: 5,
                    criticism: "",
                    suggestion: "",
                  });
                  setInstagramSkrtFollowed(false);
                  setInstagramOdojFollowed(false);
                  setInstagramHmFollowed(false);
                  setContactInterest(false);
                }}
                className="px-4 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors flex items-center gap-2 mx-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Isi Kuesioner Lagi
              </motion.button>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 font-sans">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#34D399' : '#FBBF24',
              borderRadius: '50%',
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden relative min-h-[600px] flex flex-col border border-emerald-100"
        >
          {/* Progress Bar dengan animasi */}
          <div className="h-2 bg-emerald-100 w-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 8) * 100}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>

          {/* Top Bar dengan tema toggle */}
          <div className="p-4 flex items-center justify-between h-16">
            {step > 0 && step < 7 && (
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack} 
                className="p-2 hover:bg-emerald-50 rounded-full text-emerald-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </motion.button>
            )}
            
            {/* Step Indicator */}
            <div className="flex-1 text-center">
              <span className="text-sm font-medium text-emerald-600">
                Step {step + 1} of 8
              </span>
            </div>
            
            {/* Night Mode Toggle */}
            {step === 0 && (
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className="p-2 hover:bg-emerald-50 rounded-full text-emerald-700 transition-colors"
              >
                {isNightMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 100
                }}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Decoration */}
          <div className="h-4 bg-gradient-to-r from-amber-200 via-emerald-200 to-amber-200"></div>
        </motion.div>
      </div>
      
      {/* Styles Injection */}
      <style jsx global>{`
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(209, 250, 229, 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10B981, #34D399);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #10B981);
        }
        
        /* Animasi teks berkedip */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-blink {
          animation: blink 2s infinite;
        }
      `}</style>
    </div>
  );
}
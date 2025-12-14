// app/wall-of-hope/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { 
  Heart, Sparkles, Users, Instagram, MessageCircle, 
  Check, Home
} from "lucide-react";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type StickyNote = {
  id: number;
  sticky_content: string;
  name: string;
  created_at: string;
};

export default function WallOfHopePage() {
  const [publicNotes, setPublicNotes] = useState<StickyNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);
  const [instagramSkrtFollowed, setInstagramSkrtFollowed] = useState(false);
  const [instagramOdojFollowed, setInstagramOdojFollowed] = useState(false);
  const [instagramHmFollowed, setInstagramHmFollowed] = useState(false);
  const [contactInterest, setContactInterest] = useState(false);

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
    try {
      const { data } = await supabase
        .from("feedback")
        .select("id, sticky_content, name, created_at")
        .not("sticky_content", "eq", "")
        .order("created_at", { ascending: false })
        .limit(20);
      
      if (data) setPublicNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInstagramClickSkrt = () => {
    window.open("https://instagram.com/skrtmedia.id", "_blank");
    setInstagramSkrtFollowed(true);
  };

  const handleInstagramClickOdoj = () => {
    window.open("https://instagram.com/odojkarawang", "_blank");
    setInstagramOdojFollowed(true);
  };

  const handleInstagramClickHm = () => {
    window.open("https://instagram.com/hallomuslimahid", "_blank");
    setInstagramHmFollowed(true);
  };

  const handleContactClick = () => {
    window.open("https://wa.me/6289647011970", "_blank");
    setContactInterest(true);
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

      {/* Navigation */}
      {/* <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-emerald-100">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Feedback</span>
          </Link>
          <div className="text-emerald-900 font-bold text-lg">
            Wall of Hope
          </div>
        </div>
      </div> */}

      <div className="container max-w-4xl mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-10 mt-6"
        >
          <div className="relative inline-block mb-4">
            <Heart className="w-16 h-16 text-emerald-600 animate-pulse" />
            {showSparkles && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">
            Wall of Hope & Keresahan
          </h1>
          <p className="text-emerald-700 max-w-2xl mx-auto">
            Temukan harapan dan keresahan dari peserta Trust is Lam lainnya.
            Kamu tidak sendiri dalam perjalanan ini ❤️
          </p>
        </motion.div>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 p-4 rounded-2xl border border-emerald-100 shadow-sm"
          >
            <div className="text-2xl font-bold text-emerald-900">{publicNotes.length}</div>
            <div className="text-sm text-emerald-600">Harapan Terkumpul</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 p-4 rounded-2xl border border-emerald-100 shadow-sm"
          >
            <div className="text-2xl font-bold text-emerald-900">100%</div>
            <div className="text-sm text-emerald-600">Anonim</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 p-4 rounded-2xl border border-emerald-100 shadow-sm"
          >
            <div className="text-2xl font-bold text-emerald-900">∞</div>
            <div className="text-sm text-emerald-600">Dukungan Tanpa Batas</div>
          </motion.div>
        </div> */}

        {/* Sticky Notes Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-emerald-900 mb-4 text-center flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Harapan & Keresahan Peserta
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <p className="text-emerald-700 mt-2">Memuat harapan...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicNotes.map((note, idx) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ 
                    rotate: idx % 2 === 0 ? 1 : -1,
                    y: -5 
                  }}
                  className="p-4 rounded-xl shadow-sm text-sm leading-relaxed text-emerald-900 bg-gradient-to-br from-amber-50 to-yellow-50 flex flex-col"
                  style={{ 
                    borderTop: '8px solid #FBBF24',
                    boxShadow: '2px 4px 12px rgba(0,0,0,0.08)'
                  }}
                >
                  <div className="flex-1 font-handwriting text-lg mb-3" style={{ fontFamily: '"Caveat", cursive' }}>
                    "{note.sticky_content}"
                  </div>
                  {/* <div className="text-xs text-emerald-600 mt-auto text-right">
                    — anonim
                  </div> */}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl text-center shadow-xl border border-emerald-100 mb-8"
        >
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">
            Mari Terus Terhubung!
          </h3>
          <p className="text-emerald-700 mb-6 max-w-2xl mx-auto">
            SKRT hadir sebagai wadah untukmu yang ingin tumbuh dalam iman, ilmu, dan ukhuwah.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* SKRT Instagram */}
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInstagramClickSkrt}
              className={`p-6 rounded-2xl border-2 transition-all ${
                instagramSkrtFollowed
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50'
                  : 'border-emerald-200 bg-white hover:border-emerald-400'
              } shadow-lg hover:shadow-xl`}
            >
              <Instagram className={`w-10 h-10 mx-auto mb-3 ${
                instagramSkrtFollowed ? 'text-emerald-600' : 'text-pink-500'
              }`} />
              <h4 className="font-bold text-emerald-900 mb-1">
                {instagramSkrtFollowed ? 'Sudah Difollow! 🎉' : 'Follow Instagram'}
              </h4>
              <p className="text-sm text-emerald-600">@skrtmedia.id</p>
            </motion.button>

            {/* WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className={`p-6 rounded-2xl border-2 transition-all ${
                contactInterest
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50'
                  : 'border-emerald-200 bg-white hover:border-emerald-400'
              } shadow-lg hover:shadow-xl`}
            >
              <MessageCircle className={`w-10 h-10 mx-auto mb-3 ${
                contactInterest ? 'text-emerald-600' : 'text-emerald-500'
              }`} />
              <h4 className="font-bold text-emerald-900 mb-1">
                {contactInterest ? 'Admin Akan Membalas! 💬' : 'Chat Admin SKRT'}
              </h4>
              <p className="text-sm text-emerald-600">+62 896-4701-1970</p>
            </motion.button>

            {/* Media Partners */}
            <div className="p-6 rounded-2xl border-2 border-emerald-200 bg-white">
              <Users className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
              <h4 className="font-bold text-emerald-900 mb-2">Media Partner</h4>
              <div className="space-y-2 justify-center text-center">
                <button
                  onClick={handleInstagramClickOdoj}
                  className="text-sm text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  @odojkarawang
                </button>
                <button
                  onClick={handleInstagramClickHm}
                  className="text-sm text-emerald-700 hover:text-emerald-900 transition-colors block"
                >
                  @hallomuslimahid
                </button>
              </div>
            </div>
          </div>

          {/* Quotes */}
          <div className="border-t border-emerald-200 pt-6 mt-6">
            <div className="text-xl font-handwriting text-emerald-900 mb-2" style={{ fontFamily: '"Caveat", cursive' }}>
              "Trust is Lam bukan akhir. Ini baru awal perjalanan kita."
            </div>
            <p className="text-sm text-emerald-600">
              SKRT: Sempat Kelam, Resah Tinggalkan
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-emerald-200">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Berikan Feedback Anda
          </Link>
          <p className="text-sm text-emerald-600 mt-4">
            skrtmedia.id | Sempat Kelam, Resah Tinggalkan
          </p>
        </div>
      </div>
    </div>
  );
}
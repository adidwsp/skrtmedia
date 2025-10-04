"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Detail = () => {
  const [activeTab, setActiveTab] = useState("target");

  return (
    <>
    {/* Detail (tabs) */}
        <section id="detail" className="py-20 bg-[#E6F9FF]/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">Semua yang Perlu Kamu Tahu</h2>
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center border-b-2 border-gray-300 mb-8">
                {[
                  { key: "target", label: "Target & Lokasi" },
                  { key: "pendaftaran", label: "Pendaftaran & HTM" },
                  { key: "rundown", label: "Rundown" },
                  { key: "tatatertib", label: "Tata Tertib" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`py-2 px-6 font-semibold border-b-4 border-transparent transition-all duration-300 ${activeTab === t.key ? 'bg-[#0B6E99] text-white' : 'hover:text-[#0B6E99]'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                {activeTab === "target" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Untuk Siapa Acara Ini?</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-6 text-center">
                      <p >Acara ini dirancang khusus untuk mahasiswa dan pemuda-pemudi di Karawang, namun kami juga sangat terbuka untuk umum yang ingin belajar bersama.</p>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        
                        <p className="text-5xl mb-2">👥</p>
                        <p className="font-bold text-lg">Peserta</p>
                        <p className="text-gray-600">50 Laki-laki & 50 Perempuan</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg justify-items-center">
                        <p className="text-5xl mb-2">📍</p>
                        <p className="font-bold text-lg">Lokasi Acara</p>
                        <p className="text-gray-600">Warung Desa (Wardes), Karawang (Dekat Kampus UBP)</p>
                        <iframe className="mt-4 p-6 justify-center rounded-sm lg:w-1xl md:w-10 sm:w-50" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.0536791327618!2d107.29678807499974!3d-6.323437561876199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6977d2d6dcd971%3A0x16d632cabecff936!2sRM.%20Waroeng%20Desa!5e1!3m2!1sid!2sid!4v1759124829794!5m2!1sid!2sid"  loading="lazy"></iframe>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "pendaftaran" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Amankan Kursimu!</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Langkah Registrasi:</h4>
                        <ol className="space-y-4">
                          <li className="flex items-start"><span className="bg-[#0B6E99] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span><span>Isi formulir pendaftaran melalui link di bio Instagram kami.</span></li>
                          <li className="flex items-start"><span className="bg-[#0B6E99] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span><span>Lakukan pembayaran investasi ke rekening yang tertera.</span></li>
                          <li className="flex items-start"><span className="bg-[#0B6E99] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span><span>Kirim bukti transfer untuk konfirmasi dari admin.</span></li>
                        </ol>
                      </div>
                      <div className="bg-[#0EA5E9]/10 p-6 rounded-lg border-2 border-dashed border-[#0EA5E9]">
                        <h4 className="text-lg font-semibold mb-2">Investasi Ilmu</h4>
                        <p className="text-3xl font-bold mb-4">FREE</p>
                        <p className="font-semibold mb-2">Benefit:</p>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Snack & Minuman</li>
                          <li>Ilmu Bermanfaat</li>
                          <li>Relasi Baru</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "rundown" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Rangkaian Acara</h3>
                    <div className="relative border-l-2 border-dashed border-[#0B6E99] pl-8">
                      {[
                        ["15:30 - 16:00", "Registrasi & Pembukaan"],
                        ["16:00 - 16:15", "Tilawah & Sambutan"],
                        ["16:15 - 17:45", "Sesi Materi Inti: \"Trust Islam\""],
                        ["17:45 - 19:00", "Ishoma (Istirahat, Sholat Maghrib, Makan)"],
                        ["19:00 - 19:45", "Sesi Tanya Jawab Interaktif"],
                        ["19:45 - 20:00", "Penutupan & Doa"],
                      ].map((it, i) => (
                        <div key={i} className="mb-8 relative">
                          <div className="absolute -left-[42px] top-1 w-4 h-4 bg-[#0EA5E9] rounded-full border-4 border-white"></div>
                          <p className="font-bold">{it[0]}</p>
                          <p>{it[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "tatatertib" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Adab di Majelis Ilmu</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        ["🕒", "Datang tepat waktu."],
                        ["❤️", "Luruskan niat karena Allah."],
                        ["🤫", "Jaga ketenangan selama acara."],
                        ["📵", "Non-aktifkan nada dering HP."],
                        ["👕", "Berpakaian sopan & menutup aurat."],
                        ["✍️", "Fokus menyimak & mencatat."],
                      ].map((it, i) => (
                        <div key={i} className="flex items-center bg-gray-50 p-4 rounded-lg"><span className="text-2xl mr-4">{it[0]}</span><span>{it[1]}</span></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Detail;

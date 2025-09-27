// "use client";

// import React, { useEffect, useRef, useState } from "react";

// export default function KajianTrustIslam() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("target");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({ title: "", content: null });
//   const modalRef = useRef(null);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") setModalOpen(false);
//     };
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, []);

//   const promoData = {
//     poster: {
//       title: "Konsep Poster Utama",
//       content: (
//         <>
//           <div className="text-center border-2 border-dashed p-8 rounded-lg bg-gray-50">
//             <h3 className="text-3xl font-bold font-heading">TRUST</h3>
//             <h3 className="text-2xl font-bold font-heading line-through decoration-2 decoration-[#0EA5E9] my-1">ISSUE</h3>
//             <h3 className="text-4xl font-bold font-heading text-[#0B6E99]">ISLAM</h3>
//             <p className="mt-4 text-sm">Kajian Pemuda Karawang | [Nama Pembicara]</p>
//             <p className="text-sm">[Tanggal] | [Waktu] | [Lokasi]</p>
//           </div>
//           <div className="mt-6">
//             <h4 className="font-bold mb-2">Contoh Caption:</h4>
//             <p className="text-sm bg-gray-100 p-4 rounded-md">
//               Punya banyak pertanyaan tapi bingung harus percaya sama siapa? Ngerasa ada yang salah tapi nggak
//               tahu apa? Mungkin ini bukan sekadar <em>trust issue</em> biasa. Yuk, kita bedah dan temukan jawabannya
//               bersama di <strong>KAJIAN TRUST <span className="line-through decoration-2 decoration-[#0EA5E9]">ISSUE</span> ISLAM</strong>.
//             </p>
//           </div>
//         </>
//       ),
//     },
//     registrasi: {
//       title: "Konsep Langkah Registrasi",
//       content: (
//         <>
//           <div className="border-2 border-dashed p-8 rounded-lg bg-gray-50 text-center">
//             <h3 className="text-2xl font-bold font-heading mb-6">HOW TO JOIN</h3>
//             <div className="flex flex-col md:flex-row justify-around text-center space-y-4 md:space-y-0">
//               <div>
//                 <p className="text-4xl">📝</p>
//                 <p className="font-semibold mt-2">1. Isi Formulir</p>
//                 <p className="text-xs">Klik link di bio</p>
//               </div>
//               <div>
//                 <p className="text-4xl">💳</p>
//                 <p className="font-semibold mt-2">2. Lakukan Pembayaran</p>
//                 <p className="text-xs">Transfer investasi</p>
//               </div>
//               <div>
//                 <p className="text-4xl">✅</p>
//                 <p className="font-semibold mt-2">3. Konfirmasi</p>
//                 <p className="text-xs">Kirim bukti transfer</p>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6">
//             <h4 className="font-bold mb-2">Contoh Caption:</h4>
//             <p className="text-sm bg-gray-100 p-4 rounded-md">Cuma 3 langkah buat jadi bagian dari perubahan. Gampang banget! ✨</p>
//           </div>
//         </>
//       ),
//     },
//     tatatertib: {
//       title: "Konsep Tata Tertib (Adab Kajian)",
//       content: (
//         <>
//           <div className="border-2 border-dashed p-8 rounded-lg bg-gray-50">
//             <h3 className="text-2xl font-bold font-heading mb-6 text-center">ADAB KAJIAN</h3>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <p className="p-3 bg-white rounded shadow-sm">🕒 Tepat Waktu</p>
//               <p className="p-3 bg-white rounded shadow-sm">❤️ Niatkan Karena Allah</p>
//               <p className="p-3 bg-white rounded shadow-sm">🤫 Menjaga Ketenangan</p>
//               <p className="p-3 bg-white rounded shadow-sm">👕 Berpakaian Sopan</p>
//             </div>
//           </div>
//           <div className="mt-6">
//             <h4 className="font-bold mb-2">Contoh Caption:</h4>
//             <p className="text-sm bg-gray-100 p-4 rounded-md">Biar ilmunya berkah dan acaranya lancar, yuk kita sama-sama jaga adab.</p>
//           </div>
//         </>
//       ),
//     },
//     tiket: {
//       title: "Konsep Informasi Tiket",
//       content: (
//         <>
//           <div className="border-2 border-dashed p-8 rounded-lg bg-gray-50 text-center">
//             <h3 className="text-xl font-bold font-heading mb-2">ILMU ITU INVESTASI</h3>
//             <div className="bg-white p-6 inline-block rounded-lg shadow">
//               <p className="text-gray-600">HTM</p>
//               <p className="text-4xl font-bold text-[#0EA5E9]">Rp [Jumlah HTM]</p>
//             </div>
//             <p className="mt-4 font-semibold">Benefit: Snack, Makanan, Ilmu & Relasi Baru</p>
//           </div>
//         </>
//       ),
//     },
//     rundown: {
//       title: "Konsep Rundown Acara",
//       content: (
//         <>
//           <div className="border-2 border-dashed p-8 rounded-lg bg-gray-50">
//             <h3 className="text-2xl font-bold font-heading mb-6 text-center">OUR AGENDA</h3>
//             <ul className="text-left text-sm space-y-2">
//               <li><strong>16:00</strong> - Registrasi & Pembukaan</li>
//               <li><strong>16:15</strong> - Sesi Materi Inti: "Trust Islam"</li>
//               <li><strong>17:45</strong> - Ishoma (Sholat & Makan)</li>
//               <li><strong>19:00</strong> - Sesi Tanya Jawab</li>
//               <li><strong>19:45</strong> - Penutupan & Doa</li>
//             </ul>
//           </div>
//         </>
//       ),
//     },
//     hook: {
//       title: "Kumpulan Kata-kata Hook",
//       content: (
//         <>
//           <div className="border-2 border-dashed p-8 rounded-lg bg-gray-50">
//             <h3 className="text-2xl font-bold font-heading mb-6 text-center">PEMANIS CAPTION</h3>
//             <ul className="list-disc list-inside text-left text-sm space-y-2">
//               <li>Pernah ngerasa hampa padahal lagi rame? Mungkin yang "hilang" bukan koneksi sama orang, tapi sama Dia.</li>
//               <li><em>Overthinking</em> soal masa depan? Galau soal jodoh? Yakin Islam nggak punya solusinya?</li>
//               <li>Merasa Islam itu ribet dan cuma aturan? Yuk, kenalan lagi sama Islam yang jadi solusi, bukan beban.</li>
//               <li>Scroll sosmed terus tapi hati tetap kosong? Mungkin saatnya cari 'sesuatu' yang beda.</li>
//             </ul>
//           </div>
//         </>
//       ),
//     },
//   };

//   const promoKeys = ["poster", "registrasi", "tatatertib", "tiket", "rundown", "hook"];

//   return (
//     <div className="antialiased bg-[#F7FBFF] text-[#0F172A]">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
//         <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="font-heading font-bold text-xl text-[#0F172A]">Trust <span className="text-[#0B6E99]">Islam</span></div>
//           <div className="hidden md:flex space-x-8">
//             <a href="#beranda" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Beranda</a>
//             <a href="#tentang" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Tentang Acara</a>
//             <a href="#detail" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Detail Informasi</a>
//             <a href="#promo" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Materi Promo</a>
//           </div>

//           <div className="md:hidden">
//             <button onClick={() => setMobileOpen((s) => !s)} className="text-[#0F172A] focus:outline-none">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
//             </button>
//           </div>
//         </nav>

//         {mobileOpen && (
//           <div className="md:hidden">
//             <a href="#beranda" className="block py-2 px-4 text-sm hover:bg-gray-200">Beranda</a>
//             <a href="#tentang" className="block py-2 px-4 text-sm hover:bg-gray-200">Tentang Acara</a>
//             <a href="#detail" className="block py-2 px-4 text-sm hover:bg-gray-200">Detail Informasi</a>
//             <a href="#promo" className="block py-2 px-4 text-sm hover:bg-gray-200">Materi Promo</a>
//           </div>
//         )}
//       </header>

//       <main>
//         {/* Beranda */}
//         <section id="beranda" className="min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(247,251,255,0.8), rgba(247,251,255,1)), url('https://placehold.co/1920x1080/E6F9FF/0B6E99?text=Kajian+Pemuda')` }}>
//           <div className="container mx-auto px-6 text-center">
//             <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] font-heading">TRUST <span className="line-through decoration-2 decoration-[#0EA5E9]">ISSUE</span></h1>
//             <h1 className="text-6xl md:text-8xl font-bold text-[#0B6E99] mt-2 font-heading">ISLAM</h1>
//             <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto text-[#0F172A]">Ketika logika dan iman seolah tak sejalan, ke mana seharusnya kita percaya? Temukan kembali keyakinan bahwa Islam adalah solusi sejati dari setiap keresahan.</p>
//             <a href="#detail" className="mt-8 inline-block bg-[#0EA5E9] text-white font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition-transform transform hover:-translate-y-1">Lihat Detail & Daftar</a>
//           </div>
//         </section>

//         {/* Tentang */}
//         <section id="tentang" className="py-20">
//           <div className="container mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center mb-12 font-heading">Kenapa Acara Ini Penting?</h2>
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
//                 <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Latar Belakang</h3>
//                 <p className="text-base leading-relaxed">Di era digital, banyak generasi muda Muslim mengalami krisis kepercayaan... Kajian ini hadir sebagai jembatan untuk membangun kembali kepercayaan tersebut.</p>
//               </div>
//               <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
//                 <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Tujuan Kami</h3>
//                 <ul className="space-y-3">
//                   <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Mengembalikan pemahaman bahwa Islam adalah solusi komprehensif.</li>
//                   <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Memperkuat aqidah dan keyakinan generasi muda di Karawang.</li>
//                   <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Menjawab keraguan seputar relevansi Islam di zaman modern.</li>
//                   <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Membentuk wadah silaturahmi yang positif dan suportif.</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Detail (tabs) */}
//         <section id="detail" className="py-20 bg-[#E6F9FF]/50">
//           <div className="container mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center mb-12 font-heading">Semua yang Perlu Kamu Tahu</h2>
//             <div className="max-w-4xl mx-auto">
//               <div className="flex justify-center border-b-2 border-gray-300 mb-8">
//                 {[
//                   { key: "target", label: "Target & Lokasi" },
//                   { key: "pendaftaran", label: "Pendaftaran & HTM" },
//                   { key: "rundown", label: "Rundown" },
//                   { key: "tatatertib", label: "Tata Tertib" },
//                 ].map((t) => (
//                   <button
//                     key={t.key}
//                     onClick={() => setActiveTab(t.key)}
//                     className={`py-2 px-6 font-semibold border-b-4 border-transparent transition-all duration-300 ${activeTab === t.key ? 'bg-[#0B6E99] text-white' : 'hover:text-[#0B6E99]'}`}
//                   >
//                     {t.label}
//                   </button>
//                 ))}
//               </div>

//               <div className="bg-white p-8 rounded-lg shadow-lg">
//                 {activeTab === "target" && (
//                   <div>
//                     <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Untuk Siapa Acara Ini?</h3>
//                     <p className="mb-6">Acara ini dirancang khusus untuk mahasiswa dan pemuda-pemudi di Karawang, namun kami juga sangat terbuka untuk umum yang ingin belajar bersama.</p>
//                     <div className="grid sm:grid-cols-2 gap-6 text-center">
//                       <div className="bg-gray-50 p-6 rounded-lg">
//                         <p className="text-5xl mb-2">👥</p>
//                         <p className="font-bold text-lg">Target Peserta</p>
//                         <p className="text-gray-600">50 Laki-laki & 50 Perempuan</p>
//                       </div>
//                       <div className="bg-gray-50 p-6 rounded-lg">
//                         <p className="text-5xl mb-2">📍</p>
//                         <p className="font-bold text-lg">Lokasi Acara</p>
//                         <p className="text-gray-600">Warung Desa (Wardes), Karawang (Dekat Kampus UBP)</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "pendaftaran" && (
//                   <div>
//                     <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Amankan Kursimu!</h3>
//                     <div className="grid md:grid-cols-2 gap-8">
//                       <div>
//                         <h4 className="text-lg font-semibold mb-4">Langkah Registrasi:</h4>
//                         <ol className="space-y-4">
//                           <li className="flex items-start"><span className="bg-[#0B6E99] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span><span>Isi formulir pendaftaran melalui link di bio Instagram kami.</span></li>
//                           <li className="flex items-start"><span className="bg-[#0B6E99] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span><span>Lakukan pembayaran investasi ke rekening yang tertera.</span></li>
//                           <li className="flex items-start"><span className="bg-[#0B6E99] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span><span>Kirim bukti transfer untuk konfirmasi dari admin.</span></li>
//                         </ol>
//                       </div>
//                       <div className="bg-[#0EA5E9]/10 p-6 rounded-lg border-2 border-dashed border-[#0EA5E9]">
//                         <h4 className="text-lg font-semibold mb-2">Investasi Ilmu</h4>
//                         <p className="text-3xl font-bold mb-4">Rp [Jumlah HTM]</p>
//                         <p className="font-semibold mb-2">Benefit:</p>
//                         <ul className="list-disc list-inside text-gray-700">
//                           <li>Snack & Makanan</li>
//                           <li>Ilmu Bermanfaat</li>
//                           <li>Relasi Baru</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "rundown" && (
//                   <div>
//                     <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Rangkaian Acara</h3>
//                     <div className="relative border-l-2 border-dashed border-[#0B6E99] pl-8">
//                       {[
//                         ["15:30 - 16:00", "Registrasi & Pembukaan"],
//                         ["16:00 - 16:15", "Tilawah & Sambutan"],
//                         ["16:15 - 17:45", "Sesi Materi Inti: \"Trust Islam\""],
//                         ["17:45 - 19:00", "Ishoma (Istirahat, Sholat Maghrib, Makan)"],
//                         ["19:00 - 19:45", "Sesi Tanya Jawab Interaktif"],
//                         ["19:45 - 20:00", "Penutupan & Doa"],
//                       ].map((it, i) => (
//                         <div key={i} className="mb-8 relative">
//                           <div className="absolute -left-[42px] top-1 w-4 h-4 bg-[#0EA5E9] rounded-full border-4 border-white"></div>
//                           <p className="font-bold">{it[0]}</p>
//                           <p>{it[1]}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "tatatertib" && (
//                   <div>
//                     <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Adab di Majelis Ilmu</h3>
//                     <div className="grid sm:grid-cols-2 gap-4">
//                       {[
//                         ["🕒", "Datang tepat waktu."],
//                         ["❤️", "Luruskan niat karena Allah."],
//                         ["🤫", "Jaga ketenangan selama acara."],
//                         ["📵", "Non-aktifkan nada dering HP."],
//                         ["👕", "Berpakaian sopan & menutup aurat."],
//                         ["✍️", "Fokus menyimak & mencatat."],
//                       ].map((it, i) => (
//                         <div key={i} className="flex items-center bg-gray-50 p-4 rounded-lg"><span className="text-2xl mr-4">{it[0]}</span><span>{it[1]}</span></div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Promo */}
//         <section id="promo" className="py-20">
//           <div className="container mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center mb-4 font-heading">Materi Promosi</h2>
//             <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Untuk menyebarkan semangat acara ini, kami telah menyiapkan beberapa materi promosi untuk media sosial. Klik setiap kartu untuk melihat detailnya.</p>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {promoKeys.map((k) => (
//                 <div
//                   key={k}
//                   onClick={() => { setModalData({ title: promoData[k].title, content: promoData[k].content }); setModalOpen(true); }}
//                   className="promo-card bg-white p-6 rounded-lg shadow-md cursor-pointer border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg"
//                 >
//                   <h4 className="font-bold text-lg mb-2">{promoKeys.indexOf(k) + 1}. {promoData[k].title.split(" ")[0] || promoData[k].title}</h4>
//                   <p className="text-sm text-gray-600">{String(promoData[k].title).length > 40 ? promoData[k].title : (promoData[k].title)}</p>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </section>
//       </main>

//       <footer className="bg-[#0F172A] text-white py-8">
//         <div className="container mx-auto px-6 text-center">
//           <p className="font-heading font-bold text-xl">Trust <span className="text-[#E6F9FF]">Islam</span></p>
//           <p className="mt-2 text-sm text-gray-300">Membangun Kembali Kepercayaan: Islam Sebagai Solusi Utama.</p>
//           <p className="mt-4 text-xs text-gray-400">© 2025 Kajian Pemuda Karawang. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* Modal */}
//       {modalOpen && (
//         <div ref={modalRef} onClick={(e) => { if (e.target === modalRef.current) setModalOpen(false); }} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
//             <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
//             <div className="p-8">
//               <h3 className="text-2xl font-bold mb-6 font-heading text-center text-[#0F172A]">{modalData.title}</h3>
//               <div>{modalData.content}</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

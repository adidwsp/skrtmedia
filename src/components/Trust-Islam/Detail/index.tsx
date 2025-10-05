"use client";
import { useState } from "react";

import { TabItem, Tabs } from "flowbite-react";
import { HiLocationMarker, HiAdjustments, HiClipboardList, HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";


const Detail = () => {
  const [activeTab, setActiveTab] = useState("target");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    jenisKelamin: "",
    alamat: "",
    mahasiswa: false,
    universitas: "",
    nohp: "",
    email: "",
    membawaAnak: false,
    jumlahAnak: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleTab(tab) {
    setActiveTab(tab);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((s) => ({ ...s, [name]: checked }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation example
    if (!form.nama.trim()) return alert("Nama wajib diisi");
    if (!form.nohp.trim()) return alert("No HP wajib diisi");
    if (!form.email.trim()) return alert("Email wajib diisi");

    // Here you would normally send the data to your backend (fetch/axios)
    console.log("Data pendaftaran:", form);
    setSubmitted(true);
    setShowForm(false);
    // reset form if needed
    // setForm({ nama:'', jenisKelamin:'', alamat:'', mahasiswa:false, universitas:'', nohp:'', membawaAnak:false, jumlahAnak:'' });
    alert(
      "Terima kasih! Pendaftaran berhasil dikirim (simulasi).\nPeriksa console untuk data yang dikirim.",
    );
  }

  return (
    <>
      {/* Detail (tabs) */}
      <section id="detail" className="bg-[#E6F9FF]/50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-heading mb-12 text-center text-4xl font-bold">
            Semua yang Perlu Kamu Tahu
          </h2>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <Tabs className="justify-around" aria-label="Default tabs" variant="default"> 
                <TabItem active title="Lokasi" icon={HiLocationMarker}>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Untuk Siapa Acara Ini?</h3>
                  <p className="mb-6">Acara ini dirancang khusus untuk mahasiswa dan pemuda-pemudi di Karawang, namun kami juga sangat terbuka untuk umum yang ingin belajar bersama.</p>

                  <div className="grid sm:grid-cols-2 gap-6 text-center mb-6">
                    <div className="bg-gray-50 p-6 rounded-lg justify-items-center">
                      <HiUsers size={80} color="#0EA5E9"/>
                      <p className="font-bold text-lg">Target Peserta</p>
                      <p className="text-gray-600">50 Laki-laki & 50 Perempuan</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg justify-items-center">
                      <HiLocationMarker size={80} color="#0EA5E9"/>
                      <p className="font-bold text-lg">Lokasi Acara</p>
                      <p className="text-gray-600">Warung Desa (Wardes), Karawang (Dekat Kampus UBP)</p>
                    </div>
                  </div>
                  {/* Google Maps iframe */}
                  <div className="w-full h-64 md:h-96 rounded overflow-hidden shadow">
                    <iframe
                      title="Lokasi Warung Desa Karawang"
                      src={`https://www.google.com/maps?q=Warung+Desa+Karawang&output=embed`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <button onClick={() => setShowForm(true)} className="inline-block bg-[#0EA5E9] text-white px-6 py-3 rounded font-semibold">Order Tiket</button>
                  </div>
                  </div>
                </TabItem>
                <TabItem title="Pendaftaran" icon={HiClipboardList}>
                  {/* PENDAFTARAN TAB */} 
                  <div className="tab-pane" id="pendaftaran">
                    <h3 className="text-2xl font-bold mb-6 font-heading text-[#0B6E99]">Amankan Kursimu!</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Langkah Registrasi:</h4>
                        <ol className="space-y-4">
                          <li className="flex items-start"><span className="bg-[#0EA5E9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span><span>Isi formulir pendaftaran melalui tombol "Order Tiket".</span></li>
                          <li className="flex items-start"><span className="bg-[#0EA5E9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span><span>Lakukan pembayaran investasi ke rekening yang tertera.</span></li>
                          <li className="flex items-start"><span className="bg-[#0EA5E9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span><span>Kirim bukti transfer untuk konfirmasi dari admin.</span></li>
                        </ol>
                      </div>
                      <div className="bg-[#0EA5E9]/10 p-6 rounded-lg border-2 border-dashed border-[#0EA5E9]">
                        <h4 className="text-lg font-semibold mb-2">Investasi Ilmu</h4>
                        <p className="text-3xl font-bold mb-4">FREE</p>
                        <p className="font-semibold mb-2">Benefit:</p>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Snack & Makanan</li>
                          <li>Ilmu Bermanfaat</li>
                          <li>Relasi Baru</li>
                        </ul>

                        <div className="mt-6 text-center">
                          <button onClick={() => setShowForm(true)} className="inline-block bg-[#0EA5E9] text-white px-5 py-2 rounded font-semibold">Order Tiket</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabItem>
                <TabItem title="Rundown" icon={MdDashboard}>
                  <div>
                  <h3 className="font-heading mb-6 text-2xl font-bold text-[#0B6E99]">
                    Rangkaian Acara
                  </h3>
                  <div className="relative border-l-2 border-dashed border-[#0B6E99] pl-8">
                    {[
                      ["15:30 - 16:00", "Registrasi & Pembukaan"],
                      ["16:00 - 16:15", "Tilawah & Sambutan"],
                      ["16:15 - 17:45", 'Sesi Materi Inti: "Trust Islam"'],
                      [
                        "17:45 - 19:00",
                        "Ishoma (Istirahat, Sholat Maghrib, Makan)",
                      ],
                      ["19:00 - 19:45", "Sesi Tanya Jawab Interaktif"],
                      ["19:45 - 20:00", "Penutupan & Doa"],
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
                    <h3 className="font-heading mb-6 text-2xl font-bold text-[#0B6E99]">
                      Adab di Majelis Ilmu
                    </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["🕒", "Datang tepat waktu."],
                      ["❤️", "Luruskan niat karena Allah."],
                      ["🤫", "Jaga ketenangan selama acara."],
                      ["📵", "Non-aktifkan nada dering HP."],
                      ["👕", "Berpakaian sopan & menutup aurat."],
                      ["✍️", "Fokus menyimak & mencatat."],
                    ].map((it, i) => (
                      <div
                        key={i}
                        className="flex items-center rounded-lg bg-gray-50 p-4"
                      >
                        <span className="mr-4 text-2xl">{it[0]}</span>
                        <span>{it[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                </TabItem>
              </Tabs>
            </div>
            

            <div className="rounded-lg bg-white p-8 shadow-lg">
              {/* Modal form */}
                {showForm && (
                  <div className="fixed mt-12 inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Form Pendaftaran</h3>
                        <button onClick={() => setShowForm(false)} className="text-gray-500">✕</button>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="space-y-3">
                          <label className="block">
                            <span className="text-sm font-medium">Nama</span>
                            <input name="nama" value={form.nama} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                          </label>

                          <div>
                            <span className="text-sm font-medium">Jenis Kelamin</span>
                            <div className="mt-1 flex gap-4">
                              <label className="flex items-center gap-2"><input type="radio" name="jenisKelamin" value="Laki-laki" checked={form.jenisKelamin==='Laki-laki'} onChange={handleChange} /> Laki-laki</label>
                              <label className="flex items-center gap-2"><input type="radio" name="jenisKelamin" value="Perempuan" checked={form.jenisKelamin==='Perempuan'} onChange={handleChange} /> Perempuan</label>
                            </div>
                          </div>

                          <label className="block">
                            <span className="text-sm font-medium">Alamat</span>
                            <textarea name="alamat" value={form.alamat} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" rows={2} />
                          </label>

                          <label className="flex items-center gap-3">
                            <input type="checkbox" name="mahasiswa" checked={form.mahasiswa} onChange={handleChange} />
                            <span>Mahasiswa?</span>
                          </label>

                          {form.mahasiswa && (
                            <label className="block">
                              <span className="text-sm font-medium">Universitas</span>
                              <input name="universitas" value={form.universitas} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                            </label>
                          )}

                          <label className="block">
                            <span className="text-sm font-medium">No HP</span>
                            <input name="nohp" value={form.nohp} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                          </label>

                          <label className="block">
                            <span className="text-sm font-medium">Email</span>
                            <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                          </label>

                          <label className="flex items-center gap-3">
                            <input type="checkbox" name="membawaAnak" checked={form.membawaAnak} onChange={handleChange} />
                            <span>Membawa anak?</span>
                          </label>

                          {form.membawaAnak && (
                            <label className="block">
                              <span className="text-sm font-medium">Jumlah Anak</span>
                              <input type="number" min={0} name="jumlahAnak" value={form.jumlahAnak} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                            </label>
                          )}

                          <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded border">Batal</button>
                            <button type="submit" className="px-4 py-2 rounded bg-[#0EA5E9] text-white">Daftar</button>
                          </div>

                        </div>
                      </form>
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

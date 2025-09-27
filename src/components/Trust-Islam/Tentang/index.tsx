import Link from "next/link";

const Tentang = ({ center = true }) => {
  return (
    <>
    {/* Tentang */}
        <section id="tentang" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">Kenapa Acara Ini Penting?</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Latar Belakang</h3>
                <p className="text-base leading-relaxed">Di era digital, banyak generasi muda Muslim mengalami krisis kepercayaan... Kajian ini hadir sebagai jembatan untuk membangun kembali kepercayaan tersebut.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold mb-4 font-heading text-[#0B6E99]">Tujuan Kami</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Mengembalikan pemahaman bahwa Islam adalah solusi komprehensif.</li>
                  <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Memperkuat aqidah dan keyakinan generasi muda di Karawang.</li>
                  <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Menjawab keraguan seputar relevansi Islam di zaman modern.</li>
                  <li className="flex items-start"><span className="text-[#0EA5E9] mr-3 mt-1">✓</span> Membentuk wadah silaturahmi yang positif dan suportif.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Tentang;


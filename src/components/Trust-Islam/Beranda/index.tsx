import Link from "next/link";
import Image from "next/image";
import { FaHandHoldingHeart, FaMicrophone } from "react-icons/fa";

const Beranda = ({ center = true }) => {
  // Data sponsor dan media partner
  const sponsors = [
    { id: 1, logo: "/images/sponsors/sponsor1.png", name: "PT. Solusi Muslim" },
    { id: 2, logo: "/images/sponsors/sponsor2.png", name: "Baitul Maal" },
    { id: 3, logo: "/images/sponsors/sponsor3.png", name: "Muslim Store" },
    { id: 4, logo: "/images/sponsors/sponsor4.png", name: "Islamic Finance" }
  ];

  const mediaPartners = [
    { id: 1, logo: "/images/component/hallo-muslimah.jpg", name: "Hallo Muslimah", className: "rounded-full" },
    { id: 2, logo: "/images/component/odoj.png", name: "One Day One Juz" },
    { id: 3, logo: "/images/component/tfq.png", name: "Tafaquh" },
    // { id: 4, logo: "/images/media-partners/media4.png", name: "Quranic Generation" }
  ];

  return (
    <>
      {/* Beranda */}
      <section id="beranda" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        
        {/* Background Elements dengan Animasi */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-0 text-center relative z-10">
          {/* Trust Islam Title - Tetap sama layoutnya */}
          <div className={`${center ? "flex items-center justify-center" : ""}`}>
            <div className="flex items-start md:items-top gap-6 md:gap-5 sm:gap-1 sm:pl-5 sm:pr-5 px-6">
              {/* TRUST */}
              <div className="tracking-wide">
                <span 
                  className="block text-2xl xxs:text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
                  style={{ 
                    fontFamily: "Poppins, sans-serif",
                    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  TRUST
                </span>
              </div>

              {/* IS (big) */}
              <div className="leading-none">
                <span
                  className="block font-black text-[3.5rem] xxs:text-[4.5rem] xs:text-[5.5rem] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[11rem]"
                  style={{ 
                    lineHeight: 0.85, 
                    fontFamily: "Poppins, sans-serif",
                    color: "#64748B"
                  }}
                >
                  IS
                </span>
              </div>

              {/* Right side: small struck word + blue LAM */}
              <div className="relative -translate-y-2 md:translate-y-0">
                {/* Small grey 'SUE' (appears struck through) */}
                <div className="relative text-left">
                  <span 
                    className="text-xl xxs:text-xl xs:text-2xl sm:text-3xl md:text-3xl font-semibold block"
                    style={{ 
                      fontFamily: "Poppins, sans-serif",
                      color: "#94A3B8",
                      textDecoration: "line-through",
                      textDecorationColor: "#EF4444",
                      textDecorationThickness: "3px"
                    }}
                  >
                    SUE
                  </span>
                </div>

                {/* Blue LAM underneath */}
                <div className="mt-2 text-left">
                  <span
                    className="block font-black text-4xl xxs:text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                    style={{ 
                      fontFamily: "Poppins, sans-serif",
                      background: "linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                  >
                    LAM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-sm xxs:text-sm sm:text-lg md:text-xl sm:mh-10 mt-6 max-w-2xl mx-auto text-[#0F172A] font-medium px-4">
            Saat logika dan perasaan seolah tak sejalan, ke mana kita harus menaruh percaya? Di tengah banyaknya pilihan dan keraguan, temukan kembali arah dan jawaban yang menenangkan atas setiap keresahan.
          </p>
          <br />
          <br />
          <p className="text-sm text-gray-500 italic sm:text-lg">{`"Bukan dunia yang salah, mungkin kita yang lupa arah."`}</p>

          {/* CTA Button */}
          <div className="mt-12">
            <a 
              href="#detail-acara" 
              className="inline-block bg-gradient-to-r from-[#0EA5E9] to-[#0369A1] text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
            >
              Lihat Detail & Daftar
            </a>
          </div>
          
          
          {/* Sponsor & Media Partner Section */}
          <div className="mt-24 max-w-4xl mx-auto px-4">
            {/* Sponsor Section */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FaHandHoldingHeart className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Sponsored by</span>
              </div>
              <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6">
                {/* {sponsors.map((sponsor) => (
                  <div 
                    key={sponsor.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center"> */}
                      {/* Placeholder untuk logo sponsor */}
                      {/* <div className="text-blue-600 font-bold text-xs text-center leading-tight">
                        {sponsor.name.split(' ')[0]}
                      </div> */}
                      {/* <Image 
                        src={sponsor.logo} 
                        alt={sponsor.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      /> */}
                    {/* </div>
                  </div>
                ))} */}
              </div>
            </div>

            {/* Media Partner Section */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <FaMicrophone className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Media Partner</span>
              </div>
              <div className="flex justify-center items-center flex-wrap gap-3 sm:gap-4">
                {mediaPartners.map((media) => (
                  <div 
                    key={media.id}
                    className="bg-white/0 backdrop-blur-sm  hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center">
                      <Image 
                        src={media.logo} 
                        alt={media.name}
                        height={48}
                        width={48}
                        className="object-contain"
                      />                     
                    </div>
                    {/* <div className="text-purple-600 font-semibold text-xs text-center leading-tight">
                        {media.name.split(' ')[0]}
                      </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#0EA5E9] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#0EA5E9] rounded-full mt-2"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Beranda;
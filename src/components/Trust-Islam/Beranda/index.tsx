import Link from "next/link";

const portraits = [
  {
  src: "/images/hero/portrait1.JPG",
  alt: "Portrait 1",
  sizeClass: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl",
  },
  {
  src: "/images/hero/landscape1.JPG",
  alt: "Portrait 2",
  sizeClass: "w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-36 rounded-2xl",
  },
  {
  src: "/images/hero/portrait2.JPG",
  alt: "Portrait center",
  sizeClass: "w-52 h-72 sm:w-64 sm:h-80 md:w-72 md:h-[360px] rounded-3xl",
  },
  {
  src: "/images/hero/landscape2.JPG",
  alt: "Portrait 4",
  sizeClass: "w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-36 rounded-2xl",
  },
  {
  src: "/images/hero/portrait1.JPG",
  alt: "Portrait 5",
  sizeClass: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl",
  },
  ];

const Beranda = ({ center = true }) => {
  return (
    <>
      {/* Beranda */}
        <section id="beranda" className="min-h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(247,251,255,0.85), rgba(247,251,255,1)), url('https://placehold.co/1920x1080/E6F9FF/0B6E99?text=SKRT+MEDIA')` }}>
          <div className="container mx-auto px-0 text-center">
            {/* <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] font-heading">TRUST</h1>
            <h1 className="text-5xl md:text-7xl font-bold text-[#969696] font-heading">IS<span className="line-through decoration-3 decoration-[#ff0000]">SUE</span></h1>
            <h1 className="text-6xl md:text-8xl font-bold text-[#0B6E99] mt-2 font-heading">ISLAM</h1> */}
            <div className={`${center ? "flex items-center justify-center" : ""}`}>
              <div className="flex items-start md:items-top gap-6 md:gap-5 sm:gap-1 px-6">
              {/* TRUST */}
                <div className="tracking-wide">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-semibold" style={{ fontFamily: "Poppins, Inter, system-ui" }}>
                  TRUST
                  </span>
                </div>


                {/* IS (big) */}
                <div className="leading-none">
                  <span
                  className="block font-extrabold text-[6.5rem] md:text-[8.5rem] lg:text-[11rem]"
                  style={{ lineHeight: 0.85, fontFamily: "Poppins, Inter, system-ui" }}
                  >
                  IS
                  </span>
                </div>


                {/* Right side: small struck word + blue LAM */}
                <div className="relative -translate-y-2 md:translate-y-0">
                  {/* Small grey 'SUE' (appears struck through) */}
                  <div className="relative text-left">
                    <span className="text-xl md:text-3xl text-gray-400 font-semibold block" style={{ fontFamily: "Poppins, Inter, system-ui" }}>
                    SUE
                    </span>


                    {/* Two red scribble lines using rotated pseudo-lines created with absolute divs */}
                    <span className="absolute left-0 top-1/2 w-[40%] h-1 bg-red-500 origin-left rounded-full opacity-90" />
                  </div>


                  {/* Blue LAM underneath */}
                  <div className="mt-2 text-left">
                    <span
                    className="block font-extrabold text-6xl md:text-7xl lg:text-8xl text-[#0EA5E9]"
                    style={{ fontFamily: "Poppins, Inter, system-ui" }}
                    >
                    LAM
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg md:text-xl sm:mh-10 mt-6 max-w-2xl mx-auto text-[#0F172A]">Ketika logika dan iman seolah tak sejalan, ke mana seharusnya kita percaya? Temukan kembali keyakinan bahwa Islam adalah solusi sejati dari setiap keresahan.</p>
            <a href="#detail-acara" className="mt-20 inline-block bg-[#0EA5E9] text-white font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition-transform transform hover:-translate-y-1">Lihat Detail & Daftar</a>
          </div>
        </section>
    </>
  );
};

export default Beranda;


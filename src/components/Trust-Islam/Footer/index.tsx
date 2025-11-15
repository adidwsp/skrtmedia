"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {

  return (
    <>
      <footer className="relative z-10 bg-gradient-to-b from-white to-gray-50 pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
        <div className="container">
          
          {/* Bagian logo dan copyright */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo/skrt-logo.svg"
                  alt="logo"
                  className="w-40 dark:hidden"
                  width={100}
                  height={20}
                />
                <Image
                  src="/images/logo/skrt-logo.svg"
                  alt="logo"
                  className="hidden w-40 dark:block"
                  width={100}
                  height={20}
                />
              </Link>
              <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                Good Vibes, Good Circle
              </p>
            </div>

            <p className="text-center text-sm text-body-color dark:text-white">
              © 2025 Trust Islam. All rights reserved. 
              <br />
              Made with ❤️ by {" "}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary font-semibold"
              >
                skrtmedia
              </a>
              {/* {", "}
              template by{" "}
              <a
                href="http://uideck.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary font-semibold"
              >
                UIdeck
              </a> */}
            </p>
          </div>
        </div>

        {/* Dekorasi background */}
        
      </footer>
    </>
  );
};

export default Footer;
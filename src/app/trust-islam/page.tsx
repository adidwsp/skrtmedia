import Header from "@/components/Trust-Islam/Header";
import Beranda from "@/components/Trust-Islam/Beranda";
import Detail from "@/components/Trust-Islam/Detail";
import Tentang from "@/components/Trust-Islam/Tentang";
import { Metadata } from "next";
import Footer from "@/components/Trust-Islam/Footer";

export const metadata: Metadata = {
  title: "Trust Islam - Skrtmedia",
  description: "Trust Islam - Your Gateway to Islamic Knowledge",
  // other metadata
};

export default function Home() {
  return (
    <>
    <main>
      {/* <ScrollUp /> */}
      <Header />
      <Beranda />
      <Tentang />
      <Detail />
      <Footer />
    </main>
    </>
  );
}

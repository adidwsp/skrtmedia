import Beranda from "@/components/Trust-Islam/Beranda";
import Detail from "@/components/Trust-Islam/Detail";
import Tentang from "@/components/Trust-Islam/Tentang";
import Ticket from "@/components/Trust-Islam/Ticket/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust Islam - Ticket",
  description: "Trust Islam - Your Gateway to Islamic Knowledge",
  // other metadata
};

export default function Home() {
  return (
    <>
    <main>
      {/* <ScrollUp /> */}
      <Ticket />
    </main>
    </>
  );
}

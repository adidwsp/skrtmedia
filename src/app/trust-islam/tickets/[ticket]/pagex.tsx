import Beranda from "@/components/Trust-Islam/Beranda";
import Detail from "@/components/Trust-Islam/Detail";
import Tentang from "@/components/Trust-Islam/Tentang";
import Ticket from "@/components/Trust-Islam/Ticket/index";
import TicketConfirmationPage from "@/components/Trust-Islam/Ticket/TicketConfirmationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust Islam - Ticket",
  description: "Trust Islam - Your Gateway to Islamic Knowledge",
  // other metadata
};

export default function Home({ params }: { params: { ticket: string } }) {
  return (
    <>
    <main>
      {/* <ScrollUp /> */}
      <TicketConfirmationPage params={params} />
    </main>
    </>
  );
}

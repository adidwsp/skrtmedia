import WallOfHopePage from "@/components/Trust-Islam/Feedback/WallOfHope";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust is Lam - Wall of Hope",
  description: "Trust is Lam - Your Gateway to Islamic Knowledge",
  // other metadata
};

export default function Home() {
  return (
    <>
    <main>
      {/* <ScrollUp /> */}
      <WallOfHopePage />
    </main>
    </>
  );
}

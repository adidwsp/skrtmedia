import FeedbackForm from "@/components/Trust-Islam/Feedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust Islam - Feedback",
  description: "Trust Islam - Your Gateway to Islamic Knowledge",
  // other metadata
};

export default function Home() {
  return (
    <>
    <main>
      {/* <ScrollUp /> */}
      <FeedbackForm />
    </main>
    </>
  );
}

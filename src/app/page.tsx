import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Header from "@/components/Header";
import Video from "@/components/Video";
import { Footer } from "flowbite-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SKRT MEDIA INDONESIA",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Header />
      <ScrollUp />
      <Hero />
      <Features />
      <Footer />
      {/* <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog /> */}
      {/* <Contact /> */}
    </>
  );
}

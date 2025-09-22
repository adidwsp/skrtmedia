import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | skrtmedia.id",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Tentang Kami"
        description="Berdasarkan data purposive yang kami buat dan teliti, didapati pada setiap pemuda yang ingin konsisten dalam taat, kebingungan untuk menemukan wadah berekspresi dan beramal dengan  baik dan benar.
"
      />
      <AboutSectionOne />
      <AboutSectionTwo /> 
    </>
  );
};

export default AboutPage;

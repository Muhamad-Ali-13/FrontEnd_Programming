import Image from "next/image";
import Navbar from "@app/components/navbar";
import Hero from "@app/components/Hero";
import Features from "@app/components/Features";
import Cta from "@app/components/Cta";
import Pricing from "@app/components/Pricing";
import Footer from "@app/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Cta/>
      <Pricing/>
      <Footer/>
    </>
  );
}
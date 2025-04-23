import Image from "next/image";
import Navbar from "@app/components/navbar";
import Hero from "@app/components/Hero";
import Features from "@app/components/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
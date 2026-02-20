'use client'
import Hero from "@/sections/Hero";
import Image from "next/image";
import ReactLenis from 'lenis/react'
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <ReactLenis root>
      <Navbar />
      <Hero />
    </ReactLenis>
  );
}

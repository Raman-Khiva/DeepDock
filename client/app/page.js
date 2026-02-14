'use client'
import Hero from "@/sections/Hero";
import Image from "next/image";
import ReactLenis from 'lenis/react'

export default function Home() {
  return (
    <ReactLenis root>
      <Hero />
    </ReactLenis>
  );
}

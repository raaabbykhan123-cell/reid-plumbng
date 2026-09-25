import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import FlowSection from "@/components/FlowSection";
import Blueprint from "@/components/Blueprint";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reid Plumbing LLC — Professional Plumbing Solutions" },
      {
        name: "description",
        content:
          "Reid Plumbing LLC provides leak detection, drain cleaning, pipe repair, water heater service and emergency plumbing. Call +1 928-899-1366.",
      },
      {
        property: "og:title",
        content: "Reid Plumbing LLC — Plumbing Built Different",
      },
      {
        property: "og:description",
        content:
          "Professional plumbing solutions built around your needs. Leak detection, drains, pipes, fixtures, water heaters and emergency plumbing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [, setReady] = useState(false);

  return (
    <div className="relative bg-ink">
      <Loader onDone={() => setReady(true)} />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <BeforeAfter />
        <FlowSection />
        <Blueprint />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LeadCapture from "@/components/LeadCapture";
import ValueCards from "@/components/ValueCards";
import Features from "@/components/Features";
import Timeline from "@/components/Timeline";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LeadCapture />
      <ValueCards />
      <Features />
      <Timeline />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}

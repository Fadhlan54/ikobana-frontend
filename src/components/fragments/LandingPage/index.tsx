"use client";

import Hero from "@/components/fragments/LandingPage/Hero";
import Superiority from "./Superiority";
import FeaturedProduct from "./FeaturedProduct";
import AboutUs from "./AboutUs";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <Hero />
      <Superiority />
      <FeaturedProduct />
      <AboutUs />
      <div>
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}

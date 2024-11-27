import { Header } from "@/sections/landing/Header";
import { Hero } from "@/sections/landing/Hero";
import { LogoTicker } from "@/sections/landing/LogoTicker";
import { ProductShowcase } from "@/sections/landing/ProductShowcase";
import { CallToAction } from "@/sections/landing/CallToAction";
import { Footer } from "@/sections/landing/Footer";

export default function Home() {
  return <>
    <Header />
    <Hero/>
    <LogoTicker/>
    <ProductShowcase/>
    <CallToAction/>
    <Footer/>
  </>;
}

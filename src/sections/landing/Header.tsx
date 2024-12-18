"use client";

import { useRouter } from "next/navigation";

import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { Router } from "lucide-react";

export const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white gap-3">
        <p className="text-white/60 hidden md:block">
          Invest or Issue bonds totally decenteralised
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get Started now</p>
          <ArrowRight className="w-4 h-4 inline-flex justify-center items-center" />
        </div>
      </div>

      <div className="py-2 px-4">
        <div className="flex items-center justify-between">
          <Image src={Logo} alt="Logo" height={20} width={120} />
          <MenuIcon className="w-6 h-6 md:hidden" />
          <nav className="hidden md:flex gap-6 text-black/60 items-center">
            <a href="#" className="text-black/60">
              About
            </a>
            <a href="#" className="text-black/60">
              Litepaper
            </a>
            <a href="#" className="text-black/60">
              Contact
            </a>
            <button
              onClick={() => {router.push("/onboarding")}}
              className="bg-black text-white px-4 py-2 rounded-lg inline-flex items-center justify-center tracking-tight"
            >
              Start now
            </button>

            {/* <WalletButton
              style={{
                backgroundColor: "black",
                color: "white",
                fontSize: "12px",
                padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                borderRadius: "0.5rem",
                height: "2.5rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            /> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

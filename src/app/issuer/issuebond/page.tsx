"use client";

import { Header } from "@/sections/issuer/issueBond/Header";
import { BondForm } from "@/sections/issuer/issueBond/bondForm";

export default function IssueBond() {
  return (
    <div className="bg-[#f2f2f2] min-h-screen h-full">
      <Header />
      <h1 className="text-center text-4xl font-bold bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-3   ">
        Issue a bond
      </h1>
      <BondForm />
    </div>
  );
}

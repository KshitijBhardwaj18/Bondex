"use client";
import { useState } from "react";
import { Header } from "@/sections/onboarding/Header";
import { SelectionCard } from "@/sections/onboarding/selection";
import { Button } from "@/components/ui/button";

export default function Onboarding() {
  enum SelectionType {
    Issuer = "issuer",
    Investor = "investor",
  }

  const [choice, setChoice] = useState<SelectionType | "">("");

  return (
    <div>
      <Header />

      <div className="   ">
        <h1 className="text-5xl md:text-5xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text  w-full mx-auto text-center">
          Are you an Issuer or an Investor?
        </h1>

        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="mx-auto flex flex-row gap-2 items-center justify-center mt-10">
              <button onClick={() => setChoice(SelectionType.Issuer)}>
                <SelectionCard
                  title="Issuer"
                  description="Are you looking to issue bonds?"
                  icon={SelectionType.Issuer}
                  selected={choice === SelectionType.Issuer}
                />
              </button>

              <button onClick={() => setChoice(SelectionType.Investor)}>
                <SelectionCard
                  title="Investor"
                  description="Are you looking to buy bonds?"
                  icon={SelectionType.Investor}
                  selected={choice === SelectionType.Investor}
                />
              </button>
            </div>
            <div className="mx-auto mt-10">
            <Button className={choice == "" ? "disabled bg-[#6b65f9] text-white font-light  " : "bg-[#6b65f9] text-white font-light "}>
            {choice === SelectionType.Issuer
              ? "Continue as Issuer"
              : choice === SelectionType.Investor
              ? "Continue as Investor"
              : "Select a choice"}
          </Button>
          </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}

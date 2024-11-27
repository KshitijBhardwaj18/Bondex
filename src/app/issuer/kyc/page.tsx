import { Header } from "@/sections/issuer/issueBond/Header";
import {KycForm} from "@/sections/issuer/issueBond/kycForm";

export default function kyc() {
  return (
    <div className="bg-[#f2f2f2] min-h-screen">
      <Header />
      <h1 className="text-center text-4xl font-bold bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-3   ">
        Tell us about your organisation
      </h1>
      <KycForm />
    </div>
  );
}

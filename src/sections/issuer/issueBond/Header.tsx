import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { WalletButton } from "@/components/solana/solana-provider";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20 bg-white">
      <div className="py-1 px-4">
        <div className="flex items-center justify-between">
          <Image src={Logo} alt="Logo" height={20} width={120} />
          <MenuIcon className="w-6 h-6 md:hidden" />
          <nav className="hidden md:flex gap-6 text-black/60 items-center">
            <div className="h-">
              <WalletButton
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  fontSize: "10px",
                  padding: "0.1rem 1rem 0.1rem 1rem",
                  height: "2rem",
                }}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

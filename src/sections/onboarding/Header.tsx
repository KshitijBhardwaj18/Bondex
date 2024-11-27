import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20  ">
      <div className="flex justify-center items-center py-3 bg-black text-white gap-3">
        <p className="text-white/60 hidden md:block font-[200] text-sm">Do you know, as of 2023 bond market was valued at $140.3 trillion </p>
       
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
        
          </nav>
        </div>
      </div>
    </header>
  );
};

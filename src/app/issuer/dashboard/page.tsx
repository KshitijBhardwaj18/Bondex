import { Header } from "@/sections/issuer/Header";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="flex flex-col">
        <div className="bg-[#000000] h-screen w-12 fixed left-0">
            
        </div>
        <div className="w-full h-8 bg-[#000000] rounded-lg"></div>
        <div className="pl-20">

        <h1 className="text-3xl font-extrabold bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
          Dashboard
        </h1>
        </div>
       
      </div>
    </div>
  );
}

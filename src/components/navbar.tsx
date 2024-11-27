import Logo from "./logo"
import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <div className="h-[80px] w-full margin flex flex-row justify-between p-[20px]  px-[60px] border-b-[2px]">
            <div >
            <Logo/>
            </div>

            <div>
                <Button className="p-[20px]">
                    Get Started
                </Button>
            </div>

        </div>


    )
}

export default Navbar;
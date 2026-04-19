import Link from "next/link";
import { CustomButton } from "./atoms/customButton";
import { NavigationMenu } from "./nav";

export const Header = () => {
  return (
    <>
      <header className=" sticky top-0 z-10 w-full h-16 flex items-center justify-between px-8 py-4 bg-header-bg dark:bg-black">
        <h1 className="text-xl font-bold text-app-theme">Vishal R S</h1>
        <NavigationMenu />
        <a
          href={"/Vishal_Selvan.pdf"}
          download="Vishal_Selvan.pdf"
          className="text-sm text-app-theme font-medium"
        >
          <CustomButton text="Download Resume" />
        </a>
      </header>
    </>
  );
};

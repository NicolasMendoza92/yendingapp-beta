"use client";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
//import { FaGlassCheers } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import NavLinks from "./nav-links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function SideNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="lg:hidden flex text-secondary font-bold items-center p-4 my-2 mt-12">
        <button id="menu-button" onClick={() => setOpen(!open)}>
          <GiHamburgerMenu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="text-3xl flex grow justify-center mr-6">
          <Link href="/dashboard">
          <Image src="/images/logo.png" alt="Yending Logo" width={48} height={48} />
          </Link>
        </div>
      </div>
      <aside
        id="side-navbar"
        className={`bg-primary_b top-0 p-4 fixed h-full w-64 max-w-full lg:static lg:w-64 transition-all transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50 md:h-screen`}
      >
        <div className="flex flex-col justify-start items-center text-secondary h-full mt-12">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-base text-center cursor-pointer font-bold border-b border-secondary_b pb-4 w-full">
              Yending App Dashboard
            </h1>
            <button
              className="lg:hidden text-secondary font-bold p-2"
              onClick={() => setOpen(false)}
            >
              <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="my-4 border-b border-secondary_b pb-4 w-full">
            <NavLinks />
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideNavbar;

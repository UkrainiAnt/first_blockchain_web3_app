import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { NavbarItem, NavbarList } from ".";
import logo from "../../assets/images/logo.png";

const NavbarLinks = () => {
  return (
    <>
      {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
        <NavbarItem key={item + index} title={item} />
      ))}
    </>
  );
};

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <NavbarLinks />
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {!isMenuOpen && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        )}
        {isMenuOpen && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        )}
        {isMenuOpen && <NavbarList setMenuOpen={setMenuOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;

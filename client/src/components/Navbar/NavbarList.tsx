import { AiOutlineClose } from "react-icons/ai";
import { NavbarItem } from ".";
import { Dispatch, SetStateAction, FC } from "react";

interface NavbarItemProps {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarList: FC<NavbarItemProps> = (props) => {
  const { setMenuOpen } = props;

  return (
    <ul className="nav_menu_list">
      <li className="text-xl w-full my-2">
        <AiOutlineClose onClick={() => setMenuOpen(false)} />
      </li>
      {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
        <NavbarItem key={item + index} title={item} classes="my-2 text-lg" />
      ))}
    </ul>
  );
};

export default NavbarList;

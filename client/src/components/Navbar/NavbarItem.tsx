import { FC } from "react";

interface NavBarItemProps {
  title: string;
  classes?: string;
}

const NavBarItem: FC<NavBarItemProps> = ({ classes = "", title }) => (
  <li className={`mx-4 cursor-pointer ${classes}`}>{title}</li>
);

export default NavBarItem;

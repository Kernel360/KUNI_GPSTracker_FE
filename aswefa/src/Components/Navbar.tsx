import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import car from "../assets/nav-bar-icons/directions_car.png";
import location from "../assets/nav-bar-icons/location_on.png";
import tool from "../assets/nav-bar-icons/Tool.png";
import folder from "../assets/nav-bar-icons/folder.png";

interface NavItem {
    to: string;
    icon: string;
    label: string;
}

const navItems: NavItem[] = [
  { to: "/",            icon: car,      label: "운행 정보" },
  { to: "/location",    icon: location, label: "위치 조회" },
  { to: "/management",  icon: tool,     label: "차량 관리" },
  { to: "/log",         icon: folder,   label: "운행 일지" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-col items-center bg-[#F5F6FF] h-screen min-w-[200px]">
      <NavLink className="mb-3" to="/" end>
        <img src={logo} alt="logo" />
      </NavLink>
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `text-[1rem] mb-9 bg-white px-5 py-2 flex gap-2 items-center rounded-[20px]
             transition-opacity duration-200
             ${isActive ? "opacity-100 shadow-xl" : "opacity-50"}`
          }>
          <img src={icon} alt={`${label} 아이콘`} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
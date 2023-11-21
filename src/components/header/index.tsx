import { FaHome, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav className="flex flex-col sm:flex-row gap-5 sm:gap-0 mb-10  justify-between items-center">
        <h1 className="text-4xl  flex items-center gap-3">
          <span className="w-72 text-pink-500 font-bold text-center">
            <span className="overline"> C_H_A_T</span> me
          </span>
        </h1>

        <ul className="flex items-center text-green-900 cursor-pointer  text-xl gap-12">
          <li
            title="home"
            className="hover:text-pink-900 p-0  hover:scale-125 transition-all"
          >
            <NavLink to={"/"}>
              <FaHome />
            </NavLink>
          </li>
          <li
            title="users"
            className="hover:text-pink-900 hover:scale-125 transition-all"
          >
            <NavLink to={"/users"}>
              <FaUsers />
            </NavLink>
          </li>
          <li
            title={"logout"}
            className="hover:text-pink-900 hover:scale-125 transition-all"
          >
            <NavLink to={"/login"}>
              <FaSignOutAlt />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

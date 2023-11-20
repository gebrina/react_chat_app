import { FaHome, FaSignOutAlt, FaUsers } from "react-icons/fa";

export const Header = () => {
  return (
    <header>
      <nav className="flex justify-between">
        <h1 className="text-4xl flex items-center gap-3">
          <span className="w-72 text-pink-500 font-bold text-center">
            <span className="overline"> C_H_A_T</span> me
          </span>
        </h1>
        <ul className="flex text-green-900 cursor-pointer  text-xl gap-12">
          <li title="home" className="hover:text-pink-900 hover:animate-bounce">
            <FaHome />
          </li>
          <li
            title="users"
            className="hover:text-pink-900 hover:animate-bounce"
          >
            <FaUsers />
          </li>
          <li
            title={"logout"}
            className="hover:text-pink-900 hover:animate-bounce"
          >
            <FaSignOutAlt />
          </li>
        </ul>
      </nav>
    </header>
  );
};

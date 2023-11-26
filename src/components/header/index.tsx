import { FaHome, FaUsers } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useChatContext } from "../../context/UseChatContext";

export const Header = () => {
  const { isUserLoggedIn, handleLogoutUser } = useChatContext();

  return (
    <header>
      <nav className="flex flex-col sm:flex-row gap-5 sm:gap-0 mb-10  justify-between items-center">
        <h1 className="text-4xl  flex items-center gap-3">
          <span className="w-72 text-pink-500 font-bold text-center">
            <span className="overline"> C_H_A_T</span> me
          </span>
        </h1>

        <ul className="flex items-center text-green-900 cursor-pointer  text-xl gap-12">
          <li title="home" className="link">
            <NavLink to={"/"}>
              <FaHome />
            </NavLink>
          </li>
          <li title="users" className="link">
            <NavLink to={"/users"}>
              <FaUsers />
            </NavLink>
          </li>
          <li
            title={`${isUserLoggedIn ? "Logout" : "Login"}`}
            onClick={handleLogoutUser}
            className="link"
          >
            <NavLink to={`/login`}>
              {isUserLoggedIn ? <BiLogOut /> : <BiLogIn />}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

import { FC } from "react";
import { TUser } from "../../types/User";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type UserProps = {
  user: TUser;
};

const User: FC<UserProps> = ({ user: { username } }) => {
  return (
    <div className="px-3 items-center flex justify-between  border-[1px] w-full  sm:w-1/3 text-center capitalize border-opacity-20 rounded hover:border-opacity-50  border-green-950 ">
      <FaEdit className="cursor-pointer hover:text-opacity-60 text-green-600" />

      <NavLink
        className="flex-1 py-2 cursor-pointer hover:animate-pulse font"
        to={`/${username}/chat`}
      >
        <span>{username}</span>
      </NavLink>
      <FaTrash className="cursor-pointer hover:text-opacity-60 text-red-600" />
    </div>
  );
};

export default User;

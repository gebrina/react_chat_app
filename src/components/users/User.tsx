import { FC } from "react";
import { TUser } from "../../types/User";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { deleteUser } from "../../api";

type UserProps = {
  user: TUser;
  setUsers: (users: TUser[]) => void;
};

const User: FC<UserProps> = ({ user: { username, id }, setUsers }) => {
  const handleDelete = async () => {
    const users = await deleteUser(id);
    users && setUsers(users);
  };

  return (
    <div className="px-3 items-center flex justify-between  border-[1px] w-full  sm:w-1/3 text-center capitalize border-opacity-20 rounded hover:border-opacity-50  border-green-950 ">
      <NavLink
        className="flex-1 py-2 cursor-pointer text-left hover:animate-pulse font"
        to={`/${username}/chat`}
      >
        <span>{username}</span>
      </NavLink>
      <FaTrash
        onClick={handleDelete}
        className="cursor-pointer hover:text-opacity-60 text-red-600"
      />
    </div>
  );
};

export default User;

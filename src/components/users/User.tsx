import { FC } from "react";
import { TUser } from "../../types/User";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { deleteUser } from "../../api";
import { useChatContext } from "../../context/UseChatContext";

type UserProps = {
  user: TUser;
  activeUsers: string[];
  setUsers: (users: TUser[]) => void;
};

const User: FC<UserProps> = ({
  user: { username, id },
  setUsers,
  activeUsers,
}) => {
  const { currentUser } = useChatContext();

  const handleDelete = async () => {
    const users = await deleteUser(id);
    users && setUsers(users);
  };

  return (
    <>
      {currentUser && currentUser.username !== username && (
        <div className="px-3 items-center flex justify-between  relative border-[1px] w-full  sm:w-1/3 text-center capitalize border-opacity-20 rounded hover:border-opacity-50  border-green-950 ">
          {activeUsers.includes(username) && (
            <span className="text-8xl text-green-600 absolute top-[-57px] ">
              .
            </span>
          )}
          <NavLink
            className="flex-1 py-2 cursor-pointer pl-5 text-left hover:animate-pulse font"
            to={`/${username}/chats`}
          >
            <span>{username}</span>
          </NavLink>
          <FaTrash
            onClick={handleDelete}
            className="cursor-pointer hover:text-opacity-60 text-red-600"
          />
        </div>
      )}
    </>
  );
};

export default User;

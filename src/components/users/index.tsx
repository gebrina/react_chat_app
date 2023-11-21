import UserForm from "./Form";
import User from "./User";
import { FaArrowLeft, FaArrowRight, FaPlus, FaXbox } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";
import { useState } from "react";

const Users = () => {
  const { users, setUsers } = useUsers();

  const [addUser, setUser] = useState(false);

  return (
    <section className="relative">
      {addUser ? (
        <>
          <button
            onClick={() => setUser(!addUser)}
            className="flex items-center
            absolute md:left-[20%]
            w-max
            right-12
         gap-1 mx-auto border-[1px]
          text-red-700 hover:border-red-700
         transition-all py-1 px-4 rounded-lg"
          >
            cancel <FaXbox />
          </button>
          <UserForm users={users} setUsers={setUsers} />
        </>
      ) : (
        <button
          onClick={() => setUser(!addUser)}
          className="flex items-center
         gap-1 mx-auto border-[1px]
          text-red-700 hover:border-green-700
         transition-all py-1 px-4 rounded-lg"
        >
          add contacts <FaPlus />
        </button>
      )}
      <section className="flex my-5 items-center flex-col gap-2">
        {users.map((user) => (
          <User setUsers={setUsers} user={user} key={user.id} />
        ))}
        <div className="flex gap-10 my-2">
          <FaArrowLeft className="text-green-900 text-xl hover:text-opacity-50 cursor-pointer" />
          <FaArrowRight className="text-green-900 text-xl hover:text-opacity-50 cursor-pointer" />
        </div>
      </section>
    </section>
  );
};

export default Users;

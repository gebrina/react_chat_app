import UserForm from "./Form";
import User from "./User";
import { FaArrowLeft, FaArrowRight, FaPlus, FaXbox } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";
import { useState } from "react";
import Search from "./Search";
import { useChatContext } from "../../context/UseChatContext";

const Users = () => {
  const { users, setUsers } = useUsers();
  const { currentUser } = useChatContext();

  const [addUser, setUser] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = users.length - 1;
  const itemsPerPage = 5;

  const handleNextPage = () => {
    if (startIndex + itemsPerPage < endIndex) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrevPage = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <section className="relative">
      <section className="text-3xl mb-2 flex justify-center gap-2 capitalize">
        <h3 className="text-green-900">Welcome</h3>
        <h3 className="text-pink-900 font-bold underline">
          {currentUser?.username}
        </h3>
      </section>

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
        <div className="flex  mx-auto w-max items-center">
          <h1 className="font-bold text-xl my-2 mx-4  text-green-700">
            Your Contacts
          </h1>
          <button
            onClick={() => setUser(!addUser)}
            className="flex items-center
         gap-1 mx-auto border-[1px]
          text-red-700 hover:border-green-700
         transition-all py-1 px-4 rounded-lg"
          >
            add contacts <FaPlus />
          </button>
        </div>
      )}

      <section className="flex px-3 my-5 items-center flex-col gap-2">
        <Search setUsers={setUsers} />

        {users.slice(startIndex, startIndex + itemsPerPage).map((user) => (
          <User setUsers={setUsers} user={user} key={user.id} />
        ))}
        <div className="flex gap-10 my-2">
          <FaArrowLeft
            onClick={handlePrevPage}
            className={`${
              startIndex === 0
                ? "text-green-600 text-opacity-60 cursor-not-allowed"
                : "text-green-900  cursor-pointer"
            } text-xl hover:text-opacity-60`}
          />
          <FaArrowRight
            onClick={handleNextPage}
            className={` ${
              startIndex + itemsPerPage >= endIndex
                ? "text-green-600 text-opacity-60 cursor-not-allowed"
                : "text-green-900 cursor-pointer"
            } text-xl hover:text-opacity-50 `}
          />
        </div>
      </section>
    </section>
  );
};

export default Users;

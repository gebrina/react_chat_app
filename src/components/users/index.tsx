import { useEffect, useState } from "react";
import { getUsers } from "../../api";
import UserForm from "./Form";
import { TUser } from "../../types/User";
import User from "./User";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  return (
    <section>
      <UserForm users={users} setUsers={setUsers} />
      <section className="flex my-5 items-center flex-col gap-2">
        {users.map((user) => (
          <User user={user} key={user.id} />
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

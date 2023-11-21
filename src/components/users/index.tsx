import UserForm from "./Form";
import User from "./User";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";

const Users = () => {
  const { users, setUsers } = useUsers();

  return (
    <section>
      <UserForm users={users} setUsers={setUsers} />
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

import { useEffect, useState } from "react";
import { getUsers } from "../../api";
import UserForm from "./Form";
import { TUser } from "../../types/User";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, [users]);

  return (
    <section>
      <UserForm />
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </section>
  );
};

export default Users;

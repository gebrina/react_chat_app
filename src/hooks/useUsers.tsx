import { useEffect, useState } from "react";
import { TUser } from "../types/User";
import { getUsers } from "../api";

const useUsers = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      users && setUsers(users);
    };
    fetchUsers();
  }, []);

  return { users, setUsers };
};

export default useUsers;

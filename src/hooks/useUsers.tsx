import { useEffect, useState } from "react";
import { TUser } from "../types/User";
import { getUsers } from "../api";

const useUsers = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      users && setUsers(users);
    };
    fetchUsers();
  }, [refetch]);

  return [users, setRefetch];
};

export default useUsers;

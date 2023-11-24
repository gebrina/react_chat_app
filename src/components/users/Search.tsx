import { ChangeEvent, FC, useState } from "react";
import { TUser } from "../../types/User";
import useUsers from "../../hooks/useUsers";
import { FaSearch } from "react-icons/fa";

type SearchProps = {
  setUsers?: (users: TUser[]) => void;
  users?: TUser[];
};

const Search: FC<SearchProps> = () => {
  const [term, setTerm] = useState("");
  const { users, setUsers } = useUsers();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTerm(value);
    const filterdUsers = users.filter((user) =>
      user.username.toLocaleLowerCase().includes(value.toLowerCase())
    );
    setUsers(filterdUsers);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <FaSearch className="absolute left-7 md:left-[34%] text-2xl text-green-700" />
      <input
        type="search"
        className="bg-transparent outline-none border-[1px] border-green-400 w-[95%] py-1 text-xl pl-8 pr-2 rounded-lg md:w-1/3"
        value={term}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;

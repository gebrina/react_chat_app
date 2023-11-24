import { ChangeEvent, FC } from "react";
import { TUser } from "../../types/User";
import { FaSearch } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";

type SearchProps = {
  setUsers: (users: TUser[]) => void;
};

const Search: FC<SearchProps> = ({ setUsers }) => {
  const { users: allUsers } = useUsers();
  let searchTimeOut: ReturnType<typeof setTimeout>;

  const handleFilterUsers = (username: string) => {
    searchTimeOut && clearTimeout(searchTimeOut);

    searchTimeOut = setTimeout(() => {
      const filterdUsers = allUsers.filter((user) =>
        user.username.toLowerCase().includes(username)
      );

      if (filterdUsers.length) {
        setUsers(filterdUsers);
      } else {
        setUsers(allUsers);
      }
    }, 500);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleFilterUsers(value.toLocaleLowerCase());
  };

  return (
    <div className="w-full flex items-center justify-center">
      <FaSearch className="absolute left-7 md:left-[34%] text-xl text-green-700" />
      <input
        type="search"
        className="bg-transparent outline-none border-[1px] border-green-400 w-[95%] py-1 text-xl pl-8 pr-2 rounded-lg md:w-1/3"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FaSave } from "react-icons/fa";
import { TUser } from "../../types/User";
import { postUser } from "../../api";

type UserFormProps = {
  setUsers: (users: TUser[]) => void;
};
const UserForm: FC<UserFormProps> = ({ setUsers }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const [error, setError] = useState({ username: "", password: "" });

  const errorMsgs = {
    length: "should have >3 charactes.",
    required: "is required.",
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { required } = errorMsgs;
    const { username, password } = user;
    if (!username && !password) {
      setError({
        username: "Username" + required,
        password: "Password" + required,
      });
    }

    if (!error) {
      const users = await postUser({ username } as TUser);
      setUsers(users);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const { length, required } = errorMsgs;

    if (!value) {
      setError(({ password }) => ({
        password,
        username: "Username" + required,
      }));
    } else if (value.length < 3) {
      setError(({ password }) => ({ password, username: "Username" + length }));
    } else {
      setError({ username: "", password: "" });
      setUser(({ password }) => ({ username: value, password }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const { required, length } = errorMsgs;
    if (value.length === 0) {
      setError(({ username }) => ({
        username,
        password: "Password" + required,
      }));
    } else if (value.length < 3) {
      setError(({ username }) => ({ username, password: "Password" + length }));
    } else {
      setError({ username: "", password: "" });
      setUser(({ username }) => ({ username, password: value }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex text-xl gap-3 flex-col text-green-950 items-center justify-center"
    >
      <div className="flex flex-col">
        <label htmlFor="username">User Name</label>
        <input
          className={`
          bg-transparent 
         shadow-lg
         px-3 py-1
         rounded
         border-[1px]
         shadow-green-50
        ${!error ? "border-green-950" : "border-red-800"}
         outline-none
          `}
          id="username"
          type="text"
          value={user.username}
          onChange={handleUsernameChange}
        />
        {error && <small className="text-red-700">{error.username}</small>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className={`
          bg-transparent 
         shadow-lg
         px-3 py-1
         rounded
         border-[1px]
         shadow-green-50
        ${!error ? "border-green-950" : "border-red-800"}
         outline-none
          `}
          id="password"
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
        />
        {error && <small className="text-red-700">{user.password}</small>}
      </div>

      <button
        className="cursor-pointer
       border-[1px]
       py-1 px-5
       gap-2
       rounded-md
       hover:border-green-950
       flex items-center text-xl
        text-green-950"
      >
        <FaSave /> Save
      </button>
    </form>
  );
};

export default UserForm;

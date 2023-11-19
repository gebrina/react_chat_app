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
  const password = "Password ",
    username = "Username ";
  const passworRequired = password + errorMsgs.required;
  const usernameRequired = username + errorMsgs.required;
  const passwordLengthError = password + errorMsgs.length;
  const usernameLengthError = username + errorMsgs.length;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = user;

    if (!username && !password) {
      setError({
        username: usernameRequired,
        password: passworRequired,
      });
    } else if (!username) {
      setError(({ password }) => ({
        password,
        username: usernameRequired,
      }));
    } else if (!password) {
      setError(({ username }) => ({
        username,
        password: passworRequired,
      }));
    }

    if (username && password) {
      const users = await postUser({ username } as TUser);
      setUsers(users);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setUser(({ password }) => ({ username: value, password }));

    if (!value) {
      setError(({ password }) => ({
        password,
        username: usernameRequired,
      }));
    } else if (value.length < 3) {
      setError(({ password }) => ({
        password,
        username: usernameLengthError,
      }));
    } else {
      setError({ username: "", password: "" });
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setUser(({ username }) => ({ username, password: value }));
    if (value.length === 0) {
      setError(({ username }) => ({
        username,
        password: passworRequired,
      }));
    } else if (value.length < 3) {
      setError(({ username }) => ({ username, password: passwordLengthError }));
    } else {
      setError({ username: "", password: "" });
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
        ${!error.password ? "border-green-950" : "border-red-800"}
         outline-none
          `}
          id="password"
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
        />
        {error.password && (
          <small className="text-red-700">{error.password}</small>
        )}
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

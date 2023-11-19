import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { TUser } from "../../types/User";
import { postUser } from "../../api";

type UserFormProps = {
  setUsers: (users: TUser[]) => void;
  users: TUser[];
};
const UserForm: FC<UserFormProps> = ({ setUsers, users }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const [error, setError] = useState({ username: "", password: "" });
  const [inputType, setInpuType] = useState("password");

  const errorMsgs = {
    length: "should have >3 charactes.",
    required: "is required.",
  };

  const password = "Password ",
    username = "Username ";
  const usernamTakenMsg = username + "is already taken.";

  const passworRequired = password + errorMsgs.required;
  const usernameRequired = username + errorMsgs.required;
  const passwordLengthError = password + errorMsgs.length;
  const usernameLengthError = username + errorMsgs.length;

  const isTakenUsername = (value: string) =>
    users.some(({ username }) => username === value);

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
    } else if (isTakenUsername(username)) {
      setError(({ password }) => ({
        username: usernamTakenMsg,
        password,
      }));
    } else {
      setError({ username: "", password: "" });
    }

    if (username && password && !isTakenUsername(username)) {
      const users = await postUser({ username, password } as TUser);
      setUsers(users);
    }
  };

  const handleToggleInputType = () => {
    if (inputType === "password") {
      setInpuType("text");
    } else {
      setInpuType("password");
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
      if (isTakenUsername(value)) {
        setError({ username: usernamTakenMsg, password: "" });
      } else {
        setError({ username: "", password: "" });
      }
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
      setError(({ username }) => ({ username, password: "" }));
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
        ${!error.username ? "border-green-950" : "border-red-800"}
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
        <div className="relative">
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
            type={inputType}
            value={user.password}
            onChange={handlePasswordChange}
          />
          <span className="absolute cursor-pointer right-1 top-[9px]">
            {inputType === "password" ? (
              <FaEye
                className="text-green-500"
                onClick={handleToggleInputType}
              />
            ) : (
              <FaEyeSlash
                className="text-red-500"
                onClick={handleToggleInputType}
              />
            )}
          </span>
        </div>
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

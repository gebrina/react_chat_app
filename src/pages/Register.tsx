import { ChangeEvent, FormEvent, useState } from "react";
import {
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaFacebookMessenger,
} from "react-icons/fa";
import { AuthUser, TUser } from "../types/User";
import { postUser } from "../api";
import { UserError } from "./Login";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const Register = () => {
  const defaultUser = { username: "", password: "" };
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser>(defaultUser);
  const [inputType, setInpuType] = useState("password");
  const [error, setError] = useState<AuthUser>(defaultUser);

  const passwordIsRequiredErrMsg = "Password is required.";
  const usernameIsRequiredErrMsg = "Username is required.";

  const { users } = useUsers();

  const handleUpdateErros = (user: UserError) => {
    const { username, password } = user;
    if (!username?.value && !password?.value) {
      setError({
        username: usernameIsRequiredErrMsg,
        password: passwordIsRequiredErrMsg,
      });
    } else if (!username?.value && username?.touched) {
      setError(({ password }) => ({
        password: password,
        username: usernameIsRequiredErrMsg,
      }));
    } else if (!password?.value && password?.touched) {
      setError(({ username }) => ({
        username: username,
        password: passwordIsRequiredErrMsg,
      }));
    } else if (username?.value && !password?.touched) {
      setError(({ password }) => ({
        password: password,
        username: "",
      }));
    } else if (password?.value && !username?.touched) {
      setError(({ username }) => ({
        username: username,
        password: "",
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = user;
    handleUpdateErros({
      username: { value: username, touched: true },
      password: { value: password, touched: true },
    });

    if (username && password) {
      const response = await postUser(user as TUser);
      if (response) {
        setUser(defaultUser);
        navigate("/login");
      }
    }
  };

  const handleToggleInputType = () => {
    if (inputType === "password") {
      setInpuType("text");
    } else {
      setInpuType("password");
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const { password } = user;
    setUser(({ password }) => ({ password, username: value }));
    const takenUsername = (users as TUser[]).some(
      ({ username }) => username === value
    );
    console.log(takenUsername);
    if (takenUsername) {
      setError(({ password }) => ({
        password,
        username: "Username is already taken!",
      }));
    } else {
      handleUpdateErros({
        username: { value, touched: true },
        password: { value: password, touched: false },
      });
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const { username } = user;
    setUser(({ username }) => ({ username, password: value }));
    handleUpdateErros({
      password: { value, touched: true },
      username: { value: username, touched: false },
    });
  };

  return (
    <section className="flex items-center flex-col gap-5 justify-center">
      <h1 className="flex items-center text-3xl font-bold">
        Start Chating... <FaFacebookMessenger className="text-green-700" />
      </h1>
      <form className="flex text-xl flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            className="bg-transparent outline-none px-3 py-1 rounded border-[1px] border-green-950"
            value={user.username}
            onChange={handleUsernameChange}
            type="text"
            id="username"
          />
          {error.username && (
            <small className="text-red-700">{error.username}</small>
          )}
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password">Passowrd</label>
          <input
            className="bg-transparent outline-none px-3 py-1 rounded border-[1px] border-green-950"
            value={user.password}
            onChange={handlePasswordChange}
            type={inputType}
            id="password"
          />
          <span
            className="absolute right-3 top-11"
            aria-label="Toggle visibiliy of password"
          >
            {inputType === "password" ? (
              <FaEye role="button" onClick={handleToggleInputType} />
            ) : (
              <FaEyeSlash
                role="button"
                className="text-red-700"
                onClick={handleToggleInputType}
              />
            )}
          </span>
          {error.password && (
            <small className="text-red-700">{error.password}</small>
          )}
        </div>
        <button className="flex border-[1px] border-green-700 mx-auto px-5 py-1 rounded hover:text-green-700 items-center justify-center gap-2">
          Register <FaCheck />
        </button>
      </form>
    </section>
  );
};

export default Register;

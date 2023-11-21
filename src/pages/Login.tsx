import { ChangeEvent, FormEvent, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaFacebookMessenger,
  FaSignInAlt,
} from "react-icons/fa";
import { AuthUser } from "../types/User";
import { loginUser } from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useChatContext } from "../context/UseChatContext";

export type UserInputError = {
  touched: boolean;
  value: string;
};

export type UserError = {
  username?: UserInputError;
  password?: UserInputError;
};

const Login = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, handleLoginUser } = useChatContext();

  const defaultUser = { username: "", password: "" };

  const [user, setUser] = useState<AuthUser>(defaultUser);
  const [inputType, setInpuType] = useState("password");
  const [error, setError] = useState<AuthUser>(defaultUser);

  const passwordIsRequiredErrMsg = "Password is required.";
  const usernameIsRequiredErrMsg = "Username is required.";

  if (isUserLoggedIn) return <Navigate to={"/users"} />;

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
      const response = await loginUser(user);
      if (response) {
        handleLoginUser(response.access_token);
        setUser(defaultUser);
        navigate("/users");
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
    handleUpdateErros({
      username: { value, touched: true },
      password: { value: password, touched: false },
    });
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
          Login <FaSignInAlt />
        </button>
        <p className="text-sm -mt-3 text-center">
          Don't have account?
          <NavLink
            className={"text-green-600 px-2 hover:underline"}
            to={"/register"}
          >
            create one.
          </NavLink>
        </p>
      </form>
    </section>
  );
};

export default Login;

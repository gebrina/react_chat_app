import { ChangeEvent, FormEvent, useState } from "react";
import { FaFacebookMessenger, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setUser(({ password }) => ({ password, username: value }));
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setUser(({ username }) => ({ username, password: value }));
  };

  return (
    <section className="flex items-center flex-col gap-5 justify-center">
      <h1 className="flex items-center text-3xl font-bold">
        Start Chating... <FaFacebookMessenger />
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
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">Passowrd</label>
          <input
            className="bg-transparent outline-none px-3 py-1 rounded border-[1px] border-green-950"
            value={user.password}
            onChange={handlePasswordChange}
            type="text"
            id="username"
          />
        </div>
        <button className="flex border-[1px] border-green-700 mx-auto px-5 py-1 rounded hover:text-green-700 items-center justify-center gap-2">
          Login <FaSignInAlt />
        </button>
      </form>
    </section>
  );
};

export default Login;

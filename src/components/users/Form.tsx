import { ChangeEvent, FormEvent, useState } from "react";
import { FaSave } from "react-icons/fa";
import axiosInstance from "../../axios";

const UserForm = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const errorMessage = "Username is rquired.";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) {
      setError(errorMessage);
    }
    !error && axiosInstance.post("/users", { username });
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setUsername(value);
    if (!value) {
      setError(errorMessage);
    } else if (value.length < 3) {
      setError("Username should have >3 charactes.");
    } else {
      setError(null);
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
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        {error && <small className="text-red-700">{error}</small>}
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

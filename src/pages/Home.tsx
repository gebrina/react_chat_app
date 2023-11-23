import { FaCheck, FaFacebookMessenger, FaQuestionCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="text-4xl h-full">
      <section className="h-full items-center px-4  md:w-2/3 md:mx-auto flex-col  py-10 md:flex-row md:py-0  flex">
        <div className="flex md:self-start my-20 flex-1 flex-col gap-10">
          <h2 className="text-2xl  gap-3 flex items-center">
            <span className="font-bold">Create account and start...</span>
            <span>
              <FaFacebookMessenger className="text-4xl text-green-800" />
            </span>
          </h2>
          <NavLink
            to={"/register"}
            className="text-xl w-max self-start 
            border-2
            border-green-700 px-3 
            py-1 rounded-lg
           text-green-900
           hover:bg-green-900
           hover:text-white
           transition-all
          "
          >
            Create account
          </NavLink>
        </div>

        <div className="flex-1/2">
          <h1 className="flex items-center justify-center gap-2">
            How to start chatting <FaQuestionCircle className="text-pink-700" />
          </h1>
          <ul className="text-lg my-3">
            <li className="flex items-center gap-2">
              <FaCheck className="text-green-800" />
              <p>
                Create your account, click the <button>Create account</button>{" "}
                button.
              </p>
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-green-800" />
              <p>Login in with your credentials.</p>
            </li>

            <li className="flex items-center gap-2">
              <FaCheck className="text-green-800" />
              <p>Create contacts and start chatting.</p>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Home;

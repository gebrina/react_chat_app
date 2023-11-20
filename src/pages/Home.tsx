import { FaFacebookMessenger } from "react-icons/fa";

const Home = () => {
  return (
    <section className="text-4xl h-full">
      <section className="h-full items-center  flex">
        <div className="flex flex-col gap-10">
          <h2 className="flex-1 text-2xl flex">
            <span className="w-72 font-bold">Create account and start...</span>
            <span>
              <FaFacebookMessenger className="text-7xl text-green-800" />
            </span>
          </h2>
          <button
            className="text-xl w-max self-center border-2 border-green-700 px-3 py-1 rounded-lg
           capitalize
           text-green-900
           hover:bg-green-900
           hover:text-white
           transition-all
          "
          >
            Create account
          </button>
        </div>

        <div className="flex-1"></div>
      </section>
    </section>
  );
};

export default Home;

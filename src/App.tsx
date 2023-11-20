import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import User from "./pages/User";
import Chat from "./pages/Chat";
import Users from "./components/users";

export default function App() {
  return (
    <main className="main-container h-screen w-screen">
      <section className="container mx-auto py-10">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:username/chats" element={<Chat />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

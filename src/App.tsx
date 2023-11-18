import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import User from "./pages/User";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:username/chats" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

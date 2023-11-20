import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import User from "./pages/User";
import { ProtectedRoute } from "./components/protected-route";
import { Header } from "./components/header";

export default function App() {
  return (
    <main className="main-container h-screen w-screen">
      <section className="container h-full mx-auto py-10">
        <ToastContainer />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/:username/chats"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

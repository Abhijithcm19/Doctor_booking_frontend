import "./App.css";
import { Routes, Route } from "react-router-dom";

import User from "./routes/Routers";
import Admin from "./routes/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;

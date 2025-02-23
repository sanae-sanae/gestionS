import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-green-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-black py-1 px-4 rounded">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Admin.css";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (email === "naseemasultana345@gmail.com" && password === "Naseema345") {

      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");

    } else {
      alert("Invalid Admin Credentials");
    }

  };

  return (
    <div className="admin-login-page">

      {/* NAVBAR ADDED HERE */}
      <Navbar />

      {/* LOGIN SECTION */}
      <div className="admin-login-container">

        <div className="admin-login-box">

          <h2>Admin Login</h2>

          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;
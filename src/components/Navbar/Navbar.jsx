import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("admin");

  const handleLogout = () => {

    localStorage.removeItem("admin");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav className="navbar">

      <h1>RoadSoS</h1>

      <ul>

        <li onClick={() => navigate("/dashboard")}>
          Home
        </li>

        <li onClick={() => navigate("/hospitals")}>
          Hospitals
        </li>

        <li onClick={() => navigate("/ambulance")}>
          Ambulance
        </li>

        <li onClick={() => navigate("/police")}>
          Police
        </li>

        <li onClick={() => navigate("/rescue")}>
          Rescue
        </li>

        <li onClick={() => navigate("/mysos")}>
          My SOS
        </li>

        <li onClick={() => navigate("/profile")}>
          Profile
        </li>

        {!isAdmin ? (
          <li onClick={() => navigate("/admin/login")}>
            Admin Login
          </li>
        ) : (
          <li onClick={() => navigate("/admin/dashboard")}>
            Admin Panel
          </li>
        )}

        <li onClick={handleLogout}>
          Logout
        </li>

      </ul>

    </nav>

  );
}

export default Navbar;
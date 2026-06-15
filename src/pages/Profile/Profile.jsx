import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function Profile() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">

      <Navbar />

      <div className="profile-content">

        <div className="profile-card">

          {/* HEADER */}
          <div className="profile-header">

            <div className="profile-avatar">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="profile"
              />
            </div>

            <h1>My Profile</h1>
            <p>RoadSoS Emergency Assistance User</p>

          </div>

          {/* BODY */}
          <div className="profile-grid">

            {/* LEFT - INFO */}
            <div className="info-section">

              <div className="info-box">
                <h3>Full Name</h3>
                <p>{user?.name || "Not Available"}</p>
              </div>

              <div className="info-box">
                <h3>Email Address</h3>
                <p>{user?.email || "Not Available"}</p>
              </div>

              <div className="info-box">
                <h3>Mobile Number</h3>
                <p>{user?.mobile || "Not Available"}</p>
              </div>

              <div className="info-box">
                <h3>User ID</h3>
                <p>{user?.id || "Not Available"}</p>
              </div>

            </div>

            {/* RIGHT - STATS */}
            <div className="stats-section">

              <div className="stat-box">
                <h2>{user?.id}</h2>
                <p>User ID</p>
              </div>

              <div className="stat-box">
                <h2>5</h2>
                <p>Total SOS</p>
              </div>

              <div className="stat-box">
                <h2>2</h2>
                <p>Resolved SOS</p>
              </div>

              <div className="last-sos">

                <h3>🚨 Last SOS Request</h3>
                <p>Location: 17.3850, 78.4867</p>
                <p>Status: ACTIVE</p>
                <p>Time: 2026-06-15 10:30 AM</p>

              </div>

            </div>

          </div>

          {/* ACTIONS */}
          <div className="profile-actions">

            <button
              className="edit-btn"
              onClick={() => navigate("/editprofile")}
            >
              <FaEdit style={{ marginRight: "8px" }} />
              Edit Profile
            </button>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
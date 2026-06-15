import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaUserEdit } from "react-icons/fa";

function EditProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      mobile,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile Updated Successfully");
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <Navbar />

      <div className="edit-wrapper">
        <div className="edit-card">
          
          <div className="edit-header">
            <FaUserEdit className="edit-icon" />
            <h1>Edit Profile</h1>
            <p>Update your personal details</p>
          </div>

          <form onSubmit={handleUpdate} className="edit-form">

            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <label>Email</label>
              <input type="email" value={user?.email} disabled />
            </div>

            <div className="input-box">
              <label>Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="btn-group">
              <button type="submit" className="save-btn">
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EditProfile;
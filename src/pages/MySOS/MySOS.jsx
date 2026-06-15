import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MySOS.css";

function MySOS() {

  const [sosList, setSosList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user) return;

    fetch(`http://localhost:8081/api/emergency/user/${user.id}`)
      .then(res => res.json())
      .then(data => setSosList(data))
      .catch(err => console.log(err));

  }, []);

  const total = sosList.length;
  const active = sosList.filter(s => s.status === "ACTIVE").length;
  const resolved = sosList.filter(s => s.status === "RESOLVED").length;

  return (
    <div className="mysos-container">

      <Navbar />

      <div className="mysos-content">

        {/* HEADER */}
        <div className="header">
          <h1>🚨 My SOS Dashboard</h1>
          <p>Track all your emergency requests in real-time</p>
        </div>

        {/* STATS */}
        <div className="stats">

          <div className="stat-card total">
            <h2>{total}</h2>
            <p>Total SOS</p>
          </div>

          <div className="stat-card active">
            <h2>{active}</h2>
            <p>Active</p>
          </div>

          <div className="stat-card resolved">
            <h2>{resolved}</h2>
            <p>Resolved</p>
          </div>

        </div>

        {/* LIST */}
        <div className="sos-list">

          {sosList.length === 0 ? (
            <div className="empty">
              🚫 No SOS requests found
            </div>
          ) : (

            sosList.map(sos => (

              <div className="sos-card" key={sos.id}>

                <div className="top">

                  <h3>🚨 SOS #{sos.id}</h3>

                  <span className={
                    sos.status === "ACTIVE"
                      ? "badge active"
                      : "badge resolved"
                  }>
                    {sos.status}
                  </span>

                </div>

                <div className="info">
                  <p><b>📍 Location:</b> {sos.location}</p>
                  <p><b>🕒 Time:</b> {sos.createdAt?.replace("T", " ")}</p>
                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default MySOS;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminDashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

function AdminDashboard() {

  const [search, setSearch] = useState("");
  const [sosList, setSosList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin/login");
      return;
    }

    fetchSOS();

    const interval = setInterval(fetchSOS, 3000);

    return () => clearInterval(interval);

  }, []);

  const fetchSOS = () => {

    fetch("http://localhost:8081/api/emergency/all")
      .then((res) => res.json())
      .then((data) => setSosList(data))
      .catch((err) => console.log(err));

  };

  const resolveSOS = (id) => {

    fetch(
      `http://localhost:8081/api/emergency/status/${id}?status=RESOLVED`,
      { method: "PUT" }
    )
      .then(() => fetchSOS())
      .catch((err) => console.log(err));

  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  // ======================
  // COUNTS
  // ======================

  const total = sosList.length;
  const active = sosList.filter((s) => s.status === "ACTIVE").length;
  const resolved = sosList.filter((s) => s.status === "RESOLVED").length;

  // ======================
  // FILTER (SEARCH FIXED)
  // ======================

  const filteredSOS = sosList.filter((sos) => {

    const text = search.toLowerCase();

    return (
      sos.userName?.toLowerCase().includes(text) ||
      sos.email?.toLowerCase().includes(text) ||
      sos.status?.toLowerCase().includes(text)
    );

  });

  // ======================
  // CHART DATA
  // ======================

  const barData = [
    { name: "Total", value: total },
    { name: "Active", value: active },
    { name: "Resolved", value: resolved }
  ];

  const pieData = [
    { name: "Active", value: active },
    { name: "Resolved", value: resolved }
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  return (

    <div className="admin-container">

      <Navbar />

      {/* HEADER */}
      <div className="admin-header">

        <h1>🚨 Admin SOS Dashboard</h1>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

      {/* SEARCH BOX */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Search by name, email, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* SUMMARY CARDS */}
      <div className="cards-wrapper">

        <div className="dash-card total">
          <h2>Total SOS</h2>
          <h1>{total}</h1>
        </div>

        <div className="dash-card active-card">
          <h2>Active SOS</h2>
          <h1>{active}</h1>
        </div>

        <div className="dash-card resolved-card">
          <h2>Resolved SOS</h2>
          <h1>{resolved}</h1>
        </div>

      </div>

      {/* SOS LIST */}
      <div className="sos-grid">

        {filteredSOS.map((sos) => (

          <div className="sos-card" key={sos.id}>

            <h3>🚨 {sos.type}</h3>

            <p><b>👤 User:</b> {sos.userName}</p>
            <p><b>📧 Email:</b> {sos.email}</p>
            <p><b>📱 Mobile:</b> {sos.mobile}</p>

            <p><b>📍 Location:</b></p>

            <a
              href={`https://maps.google.com/?q=${sos.location}`}
              target="_blank"
              rel="noreferrer"
              className="map-link"
            >
              🗺️ Open in Google Maps
            </a>

            <p>
              <b>🕒 Time:</b>{" "}
              {sos.createdAt
                ? sos.createdAt.replace("T", " ")
                : "Not Available"}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span className={sos.status === "ACTIVE" ? "active" : "resolved"}>
                {sos.status}
              </span>
            </p>

            {sos.status === "ACTIVE" && (
              <button
                className="resolve-btn"
                onClick={() => resolveSOS(sos.id)}
              >
                RESOLVE
              </button>
            )}

          </div>

        ))}

      </div>

      {/* CHARTS */}
      <div className="chart-wrapper">

        <div className="chart-box">

          <h2>SOS Overview</h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-box">

          <h2>Status Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;
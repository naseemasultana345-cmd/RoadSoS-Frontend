import { useEffect, useState } from "react";
import "./Dashboard.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {

  const [data, setData] = useState({
    totalUsers: 0,
    totalHospitals: 0,
    totalSOS: 0,
    activeSOS: 0,
    resolvedSOS: 0
  });

  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {

    fetch("http://localhost:8081/api/dashboard")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));

  }, []);

  // Pulse animation after SOS
  useEffect(() => {
    if (loading) {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }
  }, [loading]);

  const chartData = [
    { name: "Users", value: data.totalUsers },
    { name: "Hospitals", value: data.totalHospitals },
    { name: "SOS", value: data.totalSOS },
    { name: "Active", value: data.activeSOS },
    { name: "Resolved", value: data.resolvedSOS }
  ];

  const handleSOS = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const location =
          position.coords.latitude +
          "," +
          position.coords.longitude;

        fetch("http://localhost:8081/api/emergency/sos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            userName: user?.name,
            email: user?.email,
            mobile: user?.mobile,
            location: location
          }),
        })
          .then((res) => res.json())
          .then(() => {
            alert("🚨 SOS Sent Successfully");
            setLoading(false);
          })
          .catch(() => {
            alert("Error sending SOS");
            setLoading(false);
          });

      },

      () => {
        alert("Unable to fetch location");
        setLoading(false);
      }

    );

  };

  return (
    <div className={`dashboard-container ${pulse ? "pulse" : ""}`}>

      <Navbar />

      <div className="dashboard-content fade-in">

        <h1 className="title bounce">
          🚑 RoadSoS Dashboard
        </h1>

        {/* SOS BUTTON */}
        <button
          className={`sos-btn ${loading ? "loading" : ""}`}
          onClick={handleSOS}
          disabled={loading}
        >
          {loading ? "⏳ Sending SOS..." : "🚨 SOS Emergency"}
        </button>

        {/* CARDS */}
        <div className="cards-wrapper slide-up">

          <div className="dash-card users">
            <span>👥</span>
            <h2>Total Users</h2>
            <h1>{data.totalUsers}</h1>
          </div>

          <div className="dash-card hospitals">
            <span>🏥</span>
            <h2>Total Hospitals</h2>
            <h1>{data.totalHospitals}</h1>
          </div>

          <div className="dash-card sos">
            <span>🚨</span>
            <h2>Total SOS</h2>
            <h1>{data.totalSOS}</h1>
          </div>

          <div className="dash-card active-card">
            <span>⚠️</span>
            <h2>Active SOS</h2>
            <h1>{data.activeSOS}</h1>
          </div>

          <div className="dash-card resolved-card">
            <span>✅</span>
            <h2>Resolved SOS</h2>
            <h1>{data.resolvedSOS}</h1>
          </div>

        </div>

        {/* CHART */}
        <div className="chart-container zoom-in">

          <h2 className="chart-title">System Overview</h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#60A5FA"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Dashboard;
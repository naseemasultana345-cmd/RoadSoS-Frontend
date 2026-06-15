import { useEffect, useState } from "react";
import "./Hospitals.css";
import Navbar from "../../components/Navbar/Navbar";

function Hospital() {

  const [hospitals, setHospitals] = useState([]);
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);

  const areas = ["Anantapur", "Kadapa", "Kurnool", "Bangalore"];

  useEffect(() => {

    if (area !== "") {

      setLoading(true);

      fetch(`http://localhost:8081/api/hospitals/city/${area}`)
        .then((res) => res.json())
        .then((data) => {
          setHospitals(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

    } else {
      setHospitals([]);
    }

  }, [area]);

  return (
    <div className="hospital-container">

      <Navbar />

      {/* HEADER */}
      <div className="hospital-header">
        <h1>🏥 Find Nearby Hospitals</h1>
        <p>Select your area and get instant hospital contacts</p>
      </div>

      {/* FILTER */}
      <div className="filter-box">

        <label>📍 Select Area</label>

        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="">Choose Area</option>
          {areas.map((a, index) => (
            <option key={index} value={a}>
              {a}
            </option>
          ))}
        </select>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading hospitals...</p>
        </div>
      )}

      {/* HOSPITAL GRID */}
      <div className="hospital-grid">

        {!loading && hospitals.length > 0 ? (
          hospitals.map((h, index) => (
            <div
              className="hospital-card"
              key={h.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              <div className="hospital-icon">🏥</div>

              <h2>{h.name}</h2>

              <p>📍 <b>City:</b> {h.city}</p>
              <p>🏠 <b>Address:</b> {h.address}</p>
              <p>📞 <b>Mobile:</b> {h.mobile}</p>

              <a href={`tel:${h.mobile}`}>
                <button className="call-btn">
                  📞 Call Now
                </button>
              </a>

            </div>
          ))
        ) : (
          !loading && area !== "" && (
            <p className="no-data">
              No hospitals found in this area
            </p>
          )
        )}

      </div>

    </div>
  );
}

export default Hospital;
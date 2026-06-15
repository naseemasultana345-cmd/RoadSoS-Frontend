import { useEffect, useState } from "react";
import "./Police.css";
import Navbar from "../../components/Navbar/Navbar";

function Police() {

  const [stations, setStations] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = ["Anantapur", "Kadapa", "Kurnool", "Bangalore"];

  useEffect(() => {

    if (city !== "") {

      setLoading(true);

      fetch(`http://localhost:8081/api/police/city/${city}`)
        .then((res) => res.json())
        .then((data) => {
          setStations(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

    } else {
      setStations([]);
    }

  }, [city]);

  return (
    <div className="police-container">

      <Navbar />

      {/* HEADER */}
      <div className="police-header">
        <h1>🚓 Police Stations Finder</h1>
        <p>Find nearby police stations instantly for emergency support</p>
      </div>

      {/* FILTER */}
      <div className="filter-box">

        <label>📍 Select Area</label>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Choose Area</option>

          {cities.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}

        </select>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading police stations...</p>
        </div>
      )}

      {/* GRID */}
      <div className="police-grid">

        {!loading && stations.length > 0 ? (

          stations.map((station, index) => (

            <div
              className="police-card"
              key={station.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              <div className="police-icon">🚓</div>

              <h2>{station.name}</h2>

              <p>📍 <b>City:</b> {station.city}</p>
              <p>🏠 <b>Address:</b> {station.address}</p>
              <p>📞 <b>Mobile:</b> {station.mobile}</p>

              <a href={`tel:${station.mobile}`}>
                <button className="call-btn">
                  📞 Call Now
                </button>
              </a>

            </div>

          ))

        ) : (

          !loading && city !== "" && (
            <div className="empty-state">
              <h3>No police stations found 🚓</h3>
              <p>Try another city</p>
            </div>
          )

        )}

      </div>

    </div>
  );
}

export default Police;
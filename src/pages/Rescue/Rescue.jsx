import { useEffect, useState } from "react";
import "./Rescue.css";
import Navbar from "../../components/Navbar/Navbar";

function Rescue() {

  const [services, setServices] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = ["Anantapur", "Kadapa", "Kurnool", "Bangalore"];

  useEffect(() => {

    if (city !== "") {

      setLoading(true);

      fetch(`http://localhost:8081/api/rescue/city/${city}`)
        .then((res) => res.json())
        .then((data) => {
          setServices(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

    } else {
      setServices([]);
    }

  }, [city]);

  return (
    <div className="rescue-container">

      <Navbar />

      {/* HEADER */}
      <div className="rescue-header">
        <h1>🚑 Rescue Services</h1>
        <p>Find emergency rescue teams near your location instantly</p>
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
          <p>Loading rescue services...</p>
        </div>
      )}

      {/* GRID */}
      <div className="rescue-grid">

        {!loading && services.length > 0 ? (

          services.map((service, index) => (

            <div
              className="rescue-card"
              key={service.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              <div className="rescue-icon">🚑</div>

              <h2>{service.name}</h2>

              <p>📍 <b>City:</b> {service.city}</p>
              <p>🏠 <b>Address:</b> {service.address}</p>
              <p>📞 <b>Mobile:</b> {service.mobile}</p>

              <a href={`tel:${service.mobile}`}>
                <button className="call-btn">
                  📞 Call Now
                </button>
              </a>

            </div>

          ))

        ) : (

          !loading && city !== "" && (
            <div className="empty-state">
              <h3>No Rescue Services Found 🚑</h3>
              <p>Try selecting another city</p>
            </div>
          )

        )}

      </div>

    </div>
  );
}

export default Rescue;
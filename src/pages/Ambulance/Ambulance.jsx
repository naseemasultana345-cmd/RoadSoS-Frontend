import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Ambulance.css";

function Ambulance() {

  const [ambulances, setAmbulances] = useState([]);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = ["Anantapur", "Kadapa", "Kurnool", "Bangalore"];

  useEffect(() => {

    if (city !== "") {

      setLoading(true);

      fetch(`http://localhost:8081/api/ambulance/city/${city}`)
        .then(res => res.json())
        .then(data => {
          setAmbulances(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });

    } else {
      setAmbulances([]);
    }

  }, [city]);

  const handleSearch = () => {

    if (search.trim() === "") return;

    setLoading(true);

    fetch(`http://localhost:8081/api/ambulance/search/${search}`)
      .then(res => res.json())
      .then(data => {
        setAmbulances(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

  };

  const resetFilters = () => {
    setCity("");
    setSearch("");
    setAmbulances([]);
  };

  return (
    <div className="ambulance-container">

      <Navbar />

      {/* HEADER */}
      <div className="ambulance-header">
        <h1>🚑 Ambulance Finder</h1>
        <p>Search and connect with emergency ambulance services instantly</p>
      </div>

      {/* SEARCH BOX */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Search ambulance name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>
          🔍 Search
        </button>

        <button className="reset-btn" onClick={resetFilters}>
          Reset
        </button>

      </div>

      {/* FILTER */}
      <div className="filter-box">

        <select value={city} onChange={(e) => setCity(e.target.value)}>

          <option value="">📍 Select Location</option>

          {cities.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}

        </select>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading ambulances...</p>
        </div>
      )}

      {/* GRID */}
      <div className="ambulance-grid">

        {!loading && ambulances.length > 0 ? (

          ambulances.map((a, index) => (

            <div
              className="ambulance-card"
              key={a.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              <div className="ambulance-icon">🚑</div>

              <h3>{a.name}</h3>

              <p>📍 <b>City:</b> {a.city}</p>
              <p>🏠 <b>Address:</b> {a.address}</p>
              <p>🚗 <b>Vehicle:</b> {a.vehicleNumber}</p>
              <p>📞 <b>Mobile:</b> {a.mobile}</p>

              <a href={`tel:${a.mobile}`}>
                <button className="call-btn">
                  📞 Call Now
                </button>
              </a>

            </div>

          ))

        ) : (

          !loading && (
            <div className="empty-state">
              <h3>No ambulances found 🚑</h3>
              <p>Select a city or search to get results</p>
            </div>
          )

        )}

      </div>

    </div>
  );
}

export default Ambulance;
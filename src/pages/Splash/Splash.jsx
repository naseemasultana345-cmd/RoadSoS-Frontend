import "./Splash.css";
import { useNavigate } from "react-router-dom";

function Splash() {

  const navigate = useNavigate();

  return (
    <div className="splash-container">

      <div className="splash-content">

        <h1>RoadSoS</h1>

        <p>Your Emergency Assistance Partner</p>

        <button onClick={() => navigate("/login")}>
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Splash;
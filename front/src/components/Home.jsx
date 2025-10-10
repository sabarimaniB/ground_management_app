import { Link } from "react-router-dom";
import "../css/Home.css";
import heroImage from "../assets/logo.png";

export default function Home() {
  // Sample data - replace with actual API call
  const grounds = [
    {
      id: 1,
      name: "Central Park Field",
      location: "Downtown",
      image: "https://images.adsttc.com/media/images/62fb/da85/dfae/2a01/6f1d/1adc/large_jpg/compton-and-edrich-stands-lords-cricket-ground-wilkinsoneyre_1.jpg?1660672666",
    },
    {
      id: 2,
      name: "Riverside Stadium",
      location: "Eastside",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    },
    {
      id: 3,
      name: "Highland Cricket Ground",
      location: "North District",
      image: "https://images.unsplash.com/photo-1600679472829-3044539ce8ed",
    },
  ];

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Book Sports Grounds Effortlessly</h1>
          <p>Find and reserve the perfect sports facility for your next game</p>
          <Link to="/grounds" className="cta-button">
            Explore Grounds
          </Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="People playing sports" />
        </div>
      </header>

      <section className="featured-grounds">
        <h2>Featured Grounds</h2>
        <div className="grounds-grid">
          {grounds.map((ground) => (
            <div key={ground.id} className="ground-card">
              <img src={ground.image} alt={ground.name} />
              <div className="card-content">
                <h3>{ground.name}</h3>
                <p>{ground.location}</p>
                <Link to={`/ground/${ground.id}`} className="view-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
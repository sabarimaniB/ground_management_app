import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Ground.css';

export default function Grounds() {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ground/all');
        setGrounds(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to load grounds.');
        setLoading(false);
      }
    };

    fetchGrounds();
  }, []);

  if (loading) return <div className="loading">Loading grounds...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="grounds-page">
      <h1>Available Sports Grounds</h1>
      <div className="grounds-list">
        {grounds.map((ground) => (
          <div key={ground._id} className="ground-card">
            <img src={ground.image} alt={ground.name} />
            <div className="ground-info">
              <h3>{ground.name}</h3>
              <p>{ground.location}</p>
              <p>${ground.charges}/hour</p>
              <Link to={`/ground/${ground._id}`} className="view-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

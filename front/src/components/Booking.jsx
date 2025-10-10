import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Booking.css';

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://ground-management-app-backend-app.onrender.com/bookings/user/booked', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your bookings. Please try again later.');
        console.log(err);
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="booking-page">
      <h1>Your Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You don’t have any bookings yet.</p>
          <Link to="/grounds" className="browse-button">Browse Grounds</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-image">
                <img src={booking.ground_id.image} alt={booking.ground_id.name} />
              </div>
              
              <div className="booking-details">
                <h3>{booking.ground_id.name}</h3>
                <p className="location">{booking.ground_id.location}</p>
                <p className="date">
                  {new Date(booking.bookingDate).toLocaleDateString()} • 
                  {new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                  {new Date(booking.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="price">Total: ${booking.totalAmount}</p>
                <p className="status">Status: {booking.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

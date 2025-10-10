import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/GroundDetailPage.css';

export default function GroundDetails() {
  const { id } = useParams();
  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  // Fetch ground details
  useEffect(() => {
    const fetchGround = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ground/${id}`);
        setGround(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load ground details.');
        setLoading(false);
      }
    };

    fetchGround();
  }, [id]);

  // Handle booking form input
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const { date, startTime, endTime } = bookingData;

    // Validate input
    if (!date || !startTime || !endTime) {
      setBookingError('Please fill all booking details');
      setBookingSuccess('');
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (start >= end) {
      setBookingError('End time must be after start time');
      setBookingSuccess('');
      return;
    }

    try {
      const payload = {
        ground_id: id,
        bookingDate: date,
        startTime,
        endTime
      };

      console.log('Booking payload:', payload);

      await axios.post('http://localhost:5000/bookings/create', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setBookingSuccess('Booking successful!');
      setBookingError('');
      setBookingData({ date: '', startTime: '', endTime: '' });
    } catch (err) {
      console.error('Booking error:', err.response?.data);
      setBookingError(err.response?.data?.error || 'Booking failed.');
      setBookingSuccess('');
    }
  };

  if (loading) return <div className="loading">Loading ground details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!ground) return <div className="error">Ground not found</div>;

  return (
    <div className="ground-detail-page">
      <div className="ground-main">
        <div className="ground-images">
          <img src={ground.image} alt={ground.name} className="main-image" />
        </div>

        <div className="ground-info">
          <h1>{ground.name}</h1>
          <p className="location">{ground.location}</p>
          <p className="price">${ground.charges} per hour</p>

          <div className="details-section">
            <h3>Details</h3>
            <p><strong>Sport Type:</strong> {ground.type}</p>
            <p><strong>Available Slots:</strong> {ground.slots.join(', ')}</p>
            <p><strong>Description:</strong> {ground.description}</p>
          </div>

          <div className="booking-form">
            <h3>Book This Ground</h3>
            {bookingError && <div className="booking-error">{bookingError}</div>}
            {bookingSuccess && <div className="booking-success">{bookingSuccess}</div>}

            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={bookingData.startTime}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={bookingData.endTime}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <button type="submit" className="book-button">Book Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

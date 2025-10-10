import  { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for URL parameters
import '../css/BookingPage.css'; // Assuming you have a CSS file for styling

const BookingPage = () => {
    const { groundId } = useParams();
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleBooking = async () => {
        try {
            await axios.post('https://ground-management-app-backend-app.onrender.com/booking/create', {
                ground_id: groundId,
                bookingDate: date,
                startTime,
                endTime,
            });
            alert('Booking successful!');
        } catch (error) {
            console.error('Error booking slot:', error);
            alert('Failed to book slot');
        }
    };

    return (
        <div className="booking-page">
            <h1>Book Slot</h1>
            <div className="booking-form">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="startTime">Start Time:</label>
                <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <label htmlFor="endTime">End Time:</label>
                <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <button onClick={handleBooking} className="book-button">Book Slot</button>
            </div>
        </div>
    );
};

export default BookingPage;

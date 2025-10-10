const Booking = require('../models/bookingmodel');
const Ground = require('../models/groundmodel');

exports.createBooking = async (req, res) => {
    try {
        const { ground_id, bookingDate, startTime, endTime } = req.body;
        const user_id = req.user?._id; // optional chaining

        if (!user_id) return res.status(400).json({ error: 'User ID is required' });
        if (!ground_id || !bookingDate || !startTime || !endTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const start = new Date(`${bookingDate}T${startTime}`);
        const end = new Date(`${bookingDate}T${endTime}`);

        if (start >= end) return res.status(400).json({ error: 'End time must be after start time' });

        const booking = new Booking({ ground_id, bookingDate, startTime: start, endTime: end, user_id });
        await booking.save();

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Booking creation failed' });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const user_id = req.user?._id;
        if (!user_id) return res.status(400).json({ message: 'User not found' });

        const bookings = await Booking.find({ user_id })
            .populate('user_id', 'username email')
            .populate('ground_id', 'name location type image charges slots description');

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching user bookings' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user_id', 'username email')
            .populate('ground_id', 'name location type image charges slots description');

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Error deleting booking' });
    }
};

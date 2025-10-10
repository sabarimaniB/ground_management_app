const mongoose = require('mongoose');
const Booking = require('../models/bookingmodel'); // Adjust the path as necessary
const User = require('../models/usermodel'); // Adjust the path as necessary
const Ground = require('../models/groundmodel');


exports.createBooking = async (req, res) => {
    try {
        const { ground_id, bookingDate, startTime, endTime } = req.body;
        const user_id = req.user._id; // Ensure req.user is set by auth middleware

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        if (!ground_id || !bookingDate || !startTime || !endTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const start = new Date(`${bookingDate}T${startTime}`);
        const end = new Date(`${bookingDate}T${endTime}`);

        if (start >= end) {
            return res.status(400).json({ error: 'End time must be after start time' });
        }

        const booking = new Booking({
            ground_id,
            bookingDate,
            startTime: start,
            endTime: end,
            user_id
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Booking creation failed' });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User ID not found in request' });
        }
        const user_id = req.user._id; 
        const bookings = await Booking.find({ user_id })
            .populate({
                path: 'user_id',
                select: 'username email',
            })
            .populate({
                path: 'ground_id',
                select: 'name location type image charges slots description',
                model: 'Ground'
            });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching user bookings' });
    }
};



exports.getGroundsByProvider = async (req, res) => {
    try {
        const { provider_id } = req.params;
        const grounds = await Ground.find({ provider_id });

        if (grounds.length === 0) {
            return res.status(404).json({ error: 'No grounds found for this provider' });
        }

        res.status(200).json(grounds);
    } catch (error) {
        console.error('Error fetching grounds by provider ID:', error);
        res.status(500).json({ error: 'Failed to fetch grounds' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({
                path: 'user_id',
                select: 'username email'
            })
            .populate({
                path: 'ground_id',
                select: 'name location type image charges slots description',
                model: 'Ground'
            });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Error deleting booking' });
    }
};

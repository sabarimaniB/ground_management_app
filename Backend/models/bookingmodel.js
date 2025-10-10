const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs

const BookingSchema = new mongoose.Schema({
    booking_id: {
        type: String,
        default: uuidv4, // Set default value as UUID
        unique: true,    // Ensure uniqueness
        required: true
    },
    ground_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date, // Changed to Date type for better comparison
        required: true
    },
    endTime: {
        type: Date, // Changed to Date type for better comparison
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Custom validation to prevent overlapping bookings
BookingSchema.pre('save', async function(next) {
    try {
        const existingBooking = await this.constructor.findOne({
            ground_id: this.ground_id,
            bookingDate: this.bookingDate,
            $or: [
                { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } }
            ]
        });

        if (existingBooking) {
            return next(new Error('The selected time slot is already booked.'));
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Static method to find bookings by ground and date
BookingSchema.statics.findByGroundAndDate = function(ground_id, bookingDate) {
    return this.find({ ground_id, bookingDate });
};

// Indexing
BookingSchema.index({ ground_id: 1, bookingDate: 1, startTime: 1 });

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;

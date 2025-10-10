const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getAllBookings, deleteBooking } = require('../controllers/bookingcontroller');
const auth = require('../middlewares/auth')

// ✅ Correct usage
router.post('/create',auth, createBooking);
router.get('/user/:user_id',auth, getUserBookings);
router.get('/all', getAllBookings);
router.delete('/delete/:id', deleteBooking);

module.exports = router;

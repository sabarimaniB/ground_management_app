const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController'); // Adjust the path as necessary
const auth = require('../middlewares/auth'); // Adjust the path as necessary

router.post('/create', auth, bookingController.createBooking);
router.get('/user/booked', auth, bookingController.getUserBookings);
router.get('/all', auth, bookingController.getAllBookings);
router.delete('/:id', auth, bookingController.deleteBooking);

module.exports = router;

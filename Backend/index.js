const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");  // ✅ Added for cookie handling

const userRoutes = require('./routes/userroute');
const groundRoutes = require('./routes/groundroute'); 
const bookingRoutes = require('./routes/bookingroute');

const app = express();


const corsOptions = {
    origin: [
        'http://localhost:5173', // local frontend
        'https://ground-management-app-frontend.onrender.com' // deployed frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // ✅ Allow cookies or Authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());
// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://sabari:sabari@sabari.3puezsw.mongodb.net/?retryWrites=true&w=majority&appName=sabari")
    .then(() => console.log("✅ Mongoose Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/user', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/ground', groundRoutes); 

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server Running on port ${PORT}`));

// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('./config/db'); // Ensures DB connection is tested on start

// Import all route files
const userRoutes = require('./routes/userRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const lectureRoutes = require('./routes/lectureRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- API Routes ---
// This aligns with the three-tier architecture in your report
app.use('/api/users', userRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/lectures', lectureRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
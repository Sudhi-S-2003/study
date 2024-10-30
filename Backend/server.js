const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const businessRoutes = require('./routes/BusinessRoutes'); 
const InstituteRoutes = require('./routes/InstituteRoutes');
const AssetsRoutes = require('./routes/AssetsRoutes');
const AutoRoutes = require('./routes/AutoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/Location';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', businessRoutes);
app.use('/api', InstituteRoutes);
app.use("/assest",AssetsRoutes);
app.use("/auto",AutoRoutes)
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

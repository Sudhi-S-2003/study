// routes/institutes.js
const express = require('express');
const InstituteRoutes = express.Router();
const Institute = require('../models/Insitute');

// Function to calculate distance between two coordinates in km
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// GET /nearby-institutes?lat=latitude&lon=longitude
InstituteRoutes.get('/nearby-institutes', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    try {
        const nearbyInstitutes = [];
        const institutes = await Institute.find();

        // Convert the query latitude and longitude to numbers
        const queryLat = parseFloat(lat);
        const queryLon = parseFloat(lon);

        // Loop through each institute and calculate the distance
        institutes.forEach(institute => {
            const [instLon, instLat] = institute.gps.split(',').map(Number);
            const distance = getDistance(queryLat, queryLon, instLat, instLon);

            // Check if the distance is within 10 km
            if (distance <= 10) {
                nearbyInstitutes.push(institute);
            }
        });

        res.json(nearbyInstitutes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = InstituteRoutes;

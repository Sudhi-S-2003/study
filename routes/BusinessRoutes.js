const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

// GET /nearby-businesses?lat=latitude&lon=longitude
router.get('/nearby-businesses', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    try {
        const businesses = await Business.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lon), parseFloat(lat)], 
                    },
                    $maxDistance: 10000
                }
            }
        });

        res.json(businesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

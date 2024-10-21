const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location' is a GeoJSON point
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

// Create a GeoJSON index
businessSchema.index({ location: '2dsphere' });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;

// models/Institute.js
const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    gps: {
        type: String, // e.g., "longitude,latitude"
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Institute = mongoose.model('Institute', InstituteSchema);

module.exports = Institute;

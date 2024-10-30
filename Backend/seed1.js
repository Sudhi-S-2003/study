const mongoose = require('mongoose');
const Business = require('./models/Business');

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Location'; 

async function seedDatabase() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Delete existing businesses
        await Business.deleteMany({});
        
        const businesses = [
            {
                name: 'Coffee Shop A',
                description: 'A cozy place for coffee lovers.',
                location: {
                    type: 'Point',
                    coordinates: [-73.935242, 40.730610]
                }
            },
            {
                name: 'Bakery B',
                description: 'Freshly baked goods every day.',
                location: {
                    type: 'Point',
                    coordinates: [-73.944242, 40.740610]
                }
            },
            {
                name: 'Bookstore C',
                description: 'A paradise for book enthusiasts.',
                location: {
                    type: 'Point',
                    coordinates: [-73.925242, 40.720610]
                }
            },
            {
                name: 'Restaurant D',
                description: 'Delicious meals and great ambiance.',
                location: {
                    type: 'Point',
                    coordinates: [-73.915242, 40.750610]
                }
            },
            {
                name: 'Grocery Store E',
                description: 'All your daily needs under one roof.',
                location: {
                    type: 'Point',
                    coordinates: [-73.905242, 40.730610]
                }
            },
            {
                name: 'Gym F',
                description: 'Stay fit and healthy with us.',
                location: {
                    type: 'Point',
                    coordinates: [-73.895242, 40.740610]
                }
            },
            {
                name: 'Pharmacy G',
                description: 'Your health is our priority.',
                location: {
                    type: 'Point',
                    coordinates: [-73.885242, 40.720610]
                }
            },
            {
                name: 'Bar H',
                description: 'Enjoy the nightlife with great drinks.',
                location: {
                    type: 'Point',
                    coordinates: [-73.875242, 40.750610]
                }
            },
            {
                name: 'Salon I',
                description: 'Pamper yourself with our beauty services.',
                location: {
                    type: 'Point',
                    coordinates: [-73.865242, 40.730610]
                }
            },
            {
                name: 'Clothing Store J',
                description: 'Fashionable clothes for everyone.',
                location: {
                    type: 'Point',
                    coordinates: [-73.855242, 40.740610]
                }
            }
        ];

        await Business.insertMany(businesses);
        console.log('Sample data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        mongoose.connection.close();
    }
}

// Call the function to seed the database
seedDatabase();

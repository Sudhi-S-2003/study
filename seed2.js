// seed.js
const mongoose = require('mongoose');
const Institute = require('./models/Insitute'); 

const mongoURI = 'mongodb://127.0.0.1:27017/Location';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('MongoDB connected');

    await Institute.deleteMany({});

    const institutes = [
        {
            name: 'Institute of Technology A',
            description: 'Leading institute in technology education.',
            gps: '-73.935242,40.730610', 
            category: 'Technology',
        },
        {
            name: 'Institute of Arts B',
            description: 'Creative arts and design programs.',
            gps: '-73.944242,40.740610',
            category: 'Arts',
        },
        {
            name: 'Institute of Science C',
            description: 'Focus on scientific research and studies.',
            gps: '-73.925242,40.720610',
            category: 'Science',
        },
        {
            name: 'Institute of Business D',
            description: 'Business management and administration courses.',
            gps: '-73.915242,40.750610',
            category: 'Business',
        },
        {
            name: 'Institute of Health E',
            description: 'Programs in health sciences and medical training.',
            gps: '-73.905242,40.730610',
            category: 'Health',
        }
    ];

    await Institute.insertMany(institutes);
    console.log('Sample data inserted successfully');
    mongoose.connection.close();
})
.catch(err => {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
});

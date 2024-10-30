const enumValues = ['Pending', 'In Progress', 'Completed'];
const AutoCARTModel = require('../models/AutoCART');
const axios = require('axios');
const updateStatusAndNotify = async (document) => {
    const currentIndex = enumValues.indexOf(document.status);
    if (currentIndex < enumValues.length - 1) {
        document.status = enumValues[currentIndex + 1];
        document.updatedAt = Date.now();
        await document.save();

        try {
            // Notify with the updated status using POST with a request body
            await axios.post('http://localhost:5000/auto/status', {
                status: document
            });
            console.log(`Updated status to: ${document.status}`);
        } catch (error) {
            console.error('Error notifying external server:', error);
        }
    }
};

module.exports = updateStatusAndNotify;

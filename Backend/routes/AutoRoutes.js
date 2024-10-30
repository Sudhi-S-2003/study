const express = require("express");
const AutoCARTModel = require("../models/AutoCART");
const { default: axios } = require("axios");
const cron = require('node-cron');
const AutoRoutes = express.Router();
const updateStatusAndNotify = require('../utils/updateStatusAndNotify'); 
AutoRoutes.post("/create", async (req, res) => {
    try {
        const newDocument = new AutoCARTModel({
            transction_id: req.body.transction_id,
            items: req.body.items,
        });

        await newDocument.save();
        console.log('New document created with initial status:', newDocument.status);
        res.json("Create success and update status request sent every 10 min");

        // Notify that creation was successful using POST with a request body
        await axios.post('http://localhost:5000/auto/status', { status: newDocument });

        // Schedule a task to update status every 1 minute
        const task = cron.schedule('*/1 * * * *', async () => {
            const updatedDocument = await AutoCARTModel.findById(newDocument._id);
            await updateStatusAndNotify(updatedDocument);

            // Stop the task if status is 'Completed'
            if (updatedDocument.status === 'Completed') {
                task.stop();
                console.log(`Completed status for document ${newDocument._id}. Stopped updates.`);
            }
        });

    } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ message: 'Error creating document' });
    }
});
AutoRoutes.post("/status", (req, res) => {
    const status = req.body.status; // Use req.body to access the status
    console.log("New status hit:", status);
    res.json({ message: "Status received successfully", status });
});


module.exports = AutoRoutes;

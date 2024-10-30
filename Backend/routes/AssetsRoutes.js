const express = require("express");
const path = require("path");
const AssetsRoutes = express.Router();

// Utility function to serve files
const serveFile = (res, filefullname) => {
    const filePath = path.join(__dirname, '../assest', filefullname);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(err.status).end(); 
        }
    });
};

// Serve PDF file
AssetsRoutes.get("/pdf", (req, res) => {
    serveFile(res, 'Javascript.pdf');
});

// Serve Image file
AssetsRoutes.get("/img", (req, res) => {
    serveFile(res, 'Javascript.jpg');
});

// Serve Video file (assuming it's an audio file named video.mp3)
AssetsRoutes.get("/video", (req, res) => {
    serveFile(res, 'video.mp4'); 
});

module.exports = AssetsRoutes;

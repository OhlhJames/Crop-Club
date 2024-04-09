const express = require('express');
const router = express.Router();

// Import Farmer model
const Farmer = require('../models/farmer');

// GET route to fetch all farmers
router.get('/farmers', async (req, res) => {
    try {
        // Fetch all farmers from the database
        const farmers = await Farmer.find();

        // Send the list of farmers as a JSON response
        res.json(farmers);
    } catch (error) {
        // If an error occurs during the operation, send a 500 Internal Server Error response
        console.error('Error fetching farmers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to fetch a single farmer by ID
router.get('/farmers/:id', async (req, res) => {
    try {
        const farmerId = req.params.id;

        // Fetch farmer from the database by ID
        const farmer = await Farmer.findByPK(farmerId);

        if (!farmer) {
            // If farmer with the given ID is not found, send a 404 Not Found response
            return res.status(404).json({ error: 'Farmer not found' });
        }

        // If farmer is found, send it as a JSON response
        res.json(farmer);
    } catch (error) {
        // If an error occurs during the operation, send a 500 Internal Server Error response
        console.error('Error fetching farmer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

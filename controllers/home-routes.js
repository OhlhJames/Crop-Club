const router = require('express').Router();
const { User, Farmer, Reviews, Produce } = require('../models/index');
const withAuth = require('../utils/auth');

// New GET route for the homepage
router.get('/', async (req, res) => {
    try {
        // Fetch all farmers and produce data
        const farmersData = await Farmer.findAll();
        const produceData = await Produce.findAll();

        // Serialize data if using Sequelize
        const farmers = farmersData.map(farmer => farmer.get({ plain: true }));
        const produce = produceData.map(product => product.get({ plain: true }));

        // Render the 'homepage' template with the fetched data
        res.render('homepage', {
            // Pass the data to the template
            farmers,
            produce
        });
    } catch (err) {
        console.error('Error fetching data for the homepage:', err);
        res.status(500).json(err);
    }
});

// POST route to create new produce
router.post('/produce', async (req, res) => {
    try {
        const produceData = await Produce.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            availability: req.body.availability,
            filename: req.body.filename,
            farmerId: req.body.farmerId,
        });
        res.status(200).json(produceData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route to create a new farmer
router.post('/farmer', async (req, res) => {
    try {
        const farmerData = await Farmer.create({
            farm_name: req.body.farm_name,
            description: req.body.description,
            location: req.body.location,
            user_id: req.body.user_id,
        });
        res.status(200).json(farmerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route to create new review
router.post('/reviews', async (req, res) => {
    try {
        const reviewData = await Reviews.create({
            comment: req.body.comment,
            rating: req.body.rating,
            userId: req.body.userId,
            produceId: req.body.produceId,
        });
        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

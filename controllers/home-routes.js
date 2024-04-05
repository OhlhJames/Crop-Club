const router = require('express').Router();
const {User, Farmer, Reviews, Produce} = require('../models/index');
const withAuth = require('../utils/auth');

router.post('/produce', async (req,res) => {
    try{
       const produceData = await Produce.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        avalibility: req.body.avalibility,
        filename: req.body.filename,
        farmerId: req.body.farmerId,
       });
       res.status(200).json(produceData)
    }catch (err){
       res.status(500).json(err)
    }
});

module.exports = router
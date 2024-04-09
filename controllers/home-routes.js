const router = require('express').Router();
const {User, Farmer, Reviews, Produce} = require('../models/index');
const withAuth = require('../utils/auth');

router.post('/produce', async (req,res) => {
    try{
       const produceData = await Produce.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        availability: req.body.availability,
        filename: req.body.filename,
        farmerId: req.body.farmerId,
       });
       res.status(200).json(produceData)
    }catch (err){
       res.status(500).json(err)
    }
});

router.post('/farmer', async (req,res) => {
    try{
       const farmerData = await Farmer.create({
        farm_name: req.body.farm_name,
        description: req.body.description,
        location: req.body.location,
        user_id: req.body.user_id,
       });
       res.status(200).json(farmerData)
    }catch (err){
       res.status(500).json(err)
    }
});

router.post('/reviews', async (req,res) => {
    try{
      const reviewData = await Reviews.create({
       comment: req.body.comment,
       rating: req.body.rating,
       userId: req.body.userId,
       produceId: req.body.produceId
      });
     res.status(200).json(reviewData);   
    }catch (err) {
     res.status(500).json(err)
    }  
});

router.get('/Produce', async (req,res) => {
    try{
      const produceData = await Produce.findAll({
        attributes: {},
        order: [['name', 'ASC']],
      });
      const produceList = produceData.map((data) => data.get({ plain: true}));
    //  res.render('produce_Page',{
    //     name,
    //     description,
    //     price,
    //     availability,
    //     filename,
    //     farmerId,
    //  }); 
    res.status(200).json(produceList)  
    }catch (err) {
     res.status(500).json(err)
    }  
});


router.get('/reviews/id' ,async (req, res) => {
    try{
     const reviewData = await Reviews.findByPk(req.params.produceId, { 
       attributes:{}
       });
       res.status(200).json(reviewData);
    }catch (err){
    res.status(500).json(err);
    }
 });

 router.delete('/reviews/:id' , async (req, res) => {
    try{
     const deletedReview = await Reviews.destroy({
     where: {
      id: req.params.id
      }
     })
     if (!deletedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
    
      res.status(200).json({ message: 'Review deleted successfully' });
    }catch (err){
    res.status(500).json(err)
    }
    });

    router.get('/farmer', async (req, res) => {
        try{
         const farmerData = await Farmer.findAll({
           attributes: {}
           });
          const farmerList = farmerData.map((data) => data.get({plain: true}));
          res.status(200).json(farmerList);
          }catch(err){
          res.status(500).json(err)
          };
        });

    router.put('/farmer/:id' , async (req, res) => {
         try{
         const updatedFarmer = await Farmer.update({
         farm_name: req.body.farm_name,
         description: req.body.description,
         location: req.body.location
         },
          {
          where: {
            id: req.params.id
         }
          })
             
         if(!updatedFarmer){
         return  res.status(404).json({err: 'Produce not found'});
         }
         
         res.status(200).json({message: 'Produce updated successfully}'});
         }catch (err){
        res.status(500).json(err)
        
     }
})
// need to figure out how to delete a parent key 
router.delete('/produce/:id', async (req, res) => {
     try{
     const deletedProduce = await Produce.destroy({
        where: {
         id: req.params.id
         }
        });
        if(!deletedProduce) {
         return res.status(404).json({error: 'Produce not found'});
         }
         res.status(200).json({message: 'Produce deleted successfully'})
        }catch (err){
        res.status(500).json(err);
     }
});

router.put('/produce/:id' , async (req,res) => {
    try{
     const updatedProduce = await Produce.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      avalibility: req.body.avalibility,
      filename: req.body.filename,
      farmerId: req.body.farmerId
      },
      {
      where: {
        id: req.params.id
        }
      });
     if(!updatedProduce){
     return  res.status(404).json({err: 'Produce not found'});
     }
     
     res.status(200).json({message: 'Produce updated successfully'});
    }catch (err){
    res.status(500).json(err)
    
    }
    });
                



    module.exports = router
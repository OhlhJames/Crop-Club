const router = require('express').Router();
const {User} = require('../../models');

//creating a user
router.post('/', async (req, res) => {
    try{
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      //these are the things we will save in the sessions when a user creates an account
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id;

        res.status(200).json(dbUserData);
    });
    }catch (err){
       res.status(500).json(err);
    }
});

//this is to log in 
router.post('/login',async (req,res) => {
    //finds the user by inputed email
    try{
     const dbUserData = await User.findOne({
        where: {
            email: req.body.email,
        },
     });

     //checks to see if email matches
     if(!dbUserData){
        res.status(400).json({messsage: "Wrong email or password"});
        return;
     }

     const validPassword = await dbUserData.checkPasswor(req.body.password);

     //checks to see if passwoprd matches
     if(!validPassword){
        res.status(400).json({message: "Wrong email or password"});
     };

     req.session.save(() => {
        req.session.loggedIn = true;
        console.log(req.session.cookie);
        req.session.user_id = dbUserData.id

        res.status(200).json({user: dbUserData, message: 'You are now logged in!'});
     })
    }catch (err){
        res.status(500).json(err)

    }
});

router.post('/logout', (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
         res.status(404).end();
    }
});

module.exports = router;
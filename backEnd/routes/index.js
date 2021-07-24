var express = require('express');
var router = express.Router();

// IMPORTS DATABASE
var mongoose = require('mongoose');
var eventsModel = require('../models/events')
var userModel = require('../models/users')
var messageModel = require('../models/messages')

// PASSWORD
var uid2 = require('uid2')
var bcrypt = require('bcrypt')





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//EVENT ROUTES: 

  //ADD AN EVENT
      router.post('/add-event', async function(req, res, next){
        var newEvent = new eventsModel({
          private: req.body.private,
          title: req.body.title,
          desc: req.body.desc,
          image: req.body.image,
          address: req.body.address,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          date: req.body.date,
          tags: req.body.tags
          })
          var event = await newEvent.save();
          res.json({event})
      })

  //GET EVENTS FOR DISCOVER PAGE
    router.get('/get-event', async function(req, res, next){
      console.log('on add events')
    
      var events = await eventsModel.find();
    
        res.json({events})
    })
  

  //GET EVENTS FOR DISCOVER PAGE
    router.get('/get-discover-events', async function(req, res, next){
      console.log('on add events')
    
      var events = await eventsModel.find();
    
        res.json({events})
    })

  //GET EVENTS FOR MyEvents PAGE
    router.post('/get-Myevents-events', async function(req, res, next){
    
      var user = await userModel.findOne({token: req.body.token}).populate('myEvents');

    console.log(user)

    res.json({myEvents: user.myEvents})
    })
  

  // DELETE EVENT: 
    router.delete('/delete-event/:id', async function(req, res){
    
      await eventsModel.deleteOne(
        {_id: req.params.id}
      )
    })
  
  //UPDATE EVENT 
    router.post('/update-event', async function(req, res, next){

      var updatedEvent = await eventsModel.updateOne({
        _id: req.body.id
      }, {
      private: req.body.private,
      title: req.body.title,
      desc: req.body.desc,
      image: req.body.image,
      address: req.body.address,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      date: req.body.date,
      tags: req.body.tags
      })

      res.json({updatedEvent})
    })
  





//USER ROUTES
  //SIGN UP ROUTE
      router.post('/sign-up', async function(req, res, next) {
        console.log(req.body)
        var erreurValue = '';
        var checkEmail = await userModel.findOne({email: req.body.email.toLowerCase()});
        var checkUsername = await userModel.findOne({username: req.body.username.toLowerCase()});
        var okay = false;
        var token;
        if (checkEmail !== null){
          erreurValue = 'Email Déja Existant';
        }
        else if (req.body.email.trim() == '' || req.body.password.trim() == '' || req.body.username.trim() == ''){
          erreurValue = 'Entrée Invalide'
        }
        else {
        var hash = bcrypt.hashSync(req.body.password, 10)
        var newUser = new userModel({
          email: req.body.email.toLowerCase(),
          password: hash,
          token: uid2(32), 
          username: req.body.username.toLowerCase(),
        })
        var newUser = await newUser.save();
        if (newUser){
          okay = true;
          token = newUser.token;
        }
        }
        res.json({okay, erreurValue,  token})
      })

  //SIGN IN ROUTE
    router.post('/sign-in', async function(req, res, next) {
      var okay = false;
      var erreurValue = '';
      var token;
      var userCheck = await userModel.findOne({email: req.body.email.toLowerCase()});
    
      if (userCheck == undefined){
        erreurValue = "email n'existe pas"
      }
      else if(bcrypt.compareSync(req.body.password, userCheck.password)){
        okay = true;
        token = userCheck.token
      }
      else{
        erreurValue = "MDP incorrect"
      }
      res.json({okay, erreurValue, token})  
    })

//MESSAGES ROUTES: 
  //ADD MESSAGE
    router.post('/add-message', async function(req, res, next){
      var newEvent = new eventsModel({
        private: req.body.private,
        title: req.body.title,
        desc: req.body.desc,
        image: req.body.image,
        address: req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        date: req.body.date,
        tags: req.body.tags
        })
        var event = await newEvent.save();
        res.json({event})
    })


  





module.exports = router;

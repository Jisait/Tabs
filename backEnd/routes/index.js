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

//HEBERGEMENT DES IMAGES SUR CLOUDINARY
var uniqid = require("uniqid");
var cloudinary = require('cloudinary').v2;
var request = require('sync-request');
var fs = require('fs');

cloudinary.config({ 
  cloud_name: 'dcp1qn8wv', 
  api_key: '441498937782693', 
  api_secret: 'GwA-DJUthpTuqXX2Xwo6PEZHbm0' 
});





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//EVENT ROUTES: 

  //ADD AN EVENT
      router.post('/add-event', async function(req, res, next){
        console.log(req.body)

        var admin = await userModel.findOne({token: req.body.token});
        var erreur;
        var okay;

        if (req.body.title.trim() == '' || req.body.desc.trim() == '' || req.body.address.trim() == '' || req.body.image.trim() == ''){
          okay = false;
          erreur = 'Please complete every field'
        }
        else{
          okay = true;
        if (req.body.publique == 'true'){
        
        const tags = req.body.tags.split(',');
        
        var newEvent = new eventsModel({
          admin: admin.id,
          publique: req.body.publique,
          title: req.body.title,
          desc: req.body.desc,
          image: req.body.image,
          address: req.body.address,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          dateUTC: req.body.dateUTC,
          dateFront: req.body.dateFront,
          tags: tags,
          })
          var event = await newEvent.save();
        }

          else if (req.body.publique == 'false'){
            var newEvent = new eventsModel({
              admin: admin.id,
              publique: req.body.publique,
              title: req.body.title,
              desc: req.body.desc,
              image: req.body.image,
              address: req.body.address,
              longitude: req.body.longitude,
              latitude: req.body.latitude,
              dateUTC: req.body.dateUTC,
              dateFront: req.body.dateFront,
            
              contacts: JSON.parse(req.body.contacts)
              })
              var event = await newEvent.save();
            }

}
          
      res.json({event, erreur, okay})
  })

  //UPLOAD PICTURE ON CLOUDINARY

  router.post("/pictureUpload", async function (req, res, next) {

    var idPhoto = "./tmp/" + uniqid() + ".jpg"
    var resultCopy = await req.files.picture.mv(idPhoto);

    if (!resultCopy) {
      var resultCloudinary = await cloudinary.uploader.upload(idPhoto);
   
   res.json({url : resultCloudinary.url});
  
  } else {
    res.json({ error: resultCopy });
  }

  fs.unlinkSync(idPhoto);

});


      

  //GET EVENTS FOR DISCOVER PAGE
    router.get('/get-event', async function(req, res, next){

    
      var events = await eventsModel.find().populate('admin');

    
        res.json({events})
    })
  

  

  //GET EVENTS FOR MyEvents PAGE
    router.post('/get-Myevents', async function(req, res, next){
    
      var user = await userModel.findOne({token: req.body.token}).populate('myEvents');


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
      publique: req.body.publique,
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
  //ADD TO WISHLIST
  router.post('/add-to-wishlist', async function(req, res, next){

    var user = await userModel.findOne({token: req.body.token});


    const check = user.myEvents.filter(x => x == req.body.id);
    if(check.length !== 0){
      console.log('event already in Wishlist')
    }
    else{
     
    var updatedEvent = await eventsModel.findOne({_id: req.body.id})
    updatedEvent.interestedParticipants.push(user._id)
    var updatedEvent = await updatedEvent.save()
    user.myEvents.push(req.body.id)
    var user= await user.save();
    }

  
    res.json({user})
})

  //GET HOSTED EVENTS:
  router.post('/get-hostedEvents', async function(req, res, next){

    var user = await userModel.findOne({token: req.body.token});
   
    var hostedEvents = await eventsModel.find({admin: user._id})


    res.json({hostedEvents})
  })

  //ADD PRIVATE TO WISHLIST

  router.post('/get-myPrivateEvents', async function(req, res, next){

    var user = await userModel.findOne({token: req.body.token});
   
    var allEvent = await eventsModel.find()

var result = []
for (var i=0; i<allEvent.length; i++) {

    if (allEvent[i].contacts.some(item => user.phone.includes(item.phone))) {
      result.push(allEvent[i])
    }}

    res.json({result})
  })


  //REMOVE FROM WISHLIST
  router.post('/remove-from-wishlist', async function(req, res, next){

    var user = await userModel.findOne({token: req.body.token});
    var updatedEvent = await eventsModel.findOne({_id: req.body.id})
    
    var newEvents = user.myEvents.filter(x =>  x != req.body.id)

    var newPartcipantList = updatedEvent.interestedParticipants.filter(x =>  x != String(user._id))
    
    user.myEvents = newEvents
    updatedEvent.interestedParticipants = newPartcipantList

    user= await user.save();
    updatedEvent = await updatedEvent.save()

  
    res.json({user})
  })

  // ADD TO CONFIRM
  router.post('/add-to-confirm', async function(req, res, next){

    var user = await userModel.findOne({token: req.body.token});
    var updatedEvent = await eventsModel.findOne({_id: req.body.id})
    

    var newPartcipantList = updatedEvent.interestedParticipants.filter(x =>  x != String(user._id))
    
    updatedEvent.interestedParticipants = newPartcipantList

    updatedEvent.confirmedParticipants.push(user._id)
    updatedEvent = await updatedEvent.save()
  
    res.json({updatedEvent, user: user._id})
    })


  //SIGN UP ROUTE
      router.post('/sign-up', async function(req, res, next) {
   
        var erreurValue = '';
        var checkEmail = await userModel.findOne({email: req.body.email.toLowerCase()});
        var checkUsername = await userModel.findOne({username: req.body.username.toLowerCase()});
        var okay = false;
        var token;
        if (checkEmail !== null){
          erreurValue = 'Email already exists';
        }
        else if (req.body.email.trim() == '' || req.body.password.trim() == '' || req.body.username.trim() == '' || req.body.phone.trim() == ''){
          erreurValue = 'Invalid input'
        }
        else {
        var hash = bcrypt.hashSync(req.body.password, 10)
        var newUser = new userModel({
          email: req.body.email.toLowerCase(),
          password: hash,
          token: uid2(32), 
          username: req.body.username.toLowerCase(),
          avatar: req.body.avatar,
          phone: req.body.phone,
          verified: false
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
        erreurValue = "Email Doesn't exist"
      }
      else if(bcrypt.compareSync(req.body.password, userCheck.password)){
        okay = true;
        token = userCheck.token
      }
      else{
        erreurValue = "Incorrect Password"
      }
      res.json({okay, erreurValue, token})  
    })
  //GET USER:
    router.post('/get-user', async function(req, res, next){

      
      var user = await userModel.findOne({token: req.body.token});

    
        res.json({user})
    })

  //EDIT USER:

  router.post('/edit-userAvatar', async function(req, res, next){
      var user = await userModel.updateOne({ token: req.body.token},{ avatar: req.body.avatar });
    res.json({user})
        })

  router.post('/edit-userName', async function(req, res, next){
    var user;
    if (req.body.name.length>0){
       user = await userModel.updateOne({ token: req.body.token},{ username: req.body.name });}

    else{
       user = await userModel.findOne({ token: req.body.token})
    }
    res.json({user})
        })

  
  //SEARCH BY PSEUDO

  router.post('/searchByPseudo', async function(req, res, next){
    var user = await userModel.updateOne({ token: req.body.token });
  
  res.json({user})
      })


  

//MESSAGES ROUTES: 
  //ADD MESSAGE
  router.post('/add-message', async function(req, res, next){

    var user = await userModel.findOne({token: req.body.token});


      var newMessage = new messageModel({
        userId: user._id,
        eventId: req.body.eventId,
        content: req.body.content,
        date: req.body.date,
        })
        var message = await newMessage.save();

        res.json({message, user})
    })

  //GET MESSAGES
    router.post('/get-messages', async function(req, res, next){
      var user = await userModel.findOne({token: req.body.token});

      var message = await messageModel.find({eventId: req.body.eventId}).populate('userId');
  
  
  
          res.json({message, user})
      })


  


module.exports = router;

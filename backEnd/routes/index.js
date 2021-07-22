var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var eventsModel = require('../models/events')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-event', async function(req, res, next){
  var newEvent = new eventsModel({
    adminID: req.body.adminID,
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

router.get('/get-event', async function(req, res, next){
  console.log('on add events')

  var events = await eventsModel.find();

    res.json({events})
})

module.exports = router;

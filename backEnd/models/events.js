var mongoose =require('mongoose');


var eventSchema = mongoose.Schema({
  adminID: String,
  Private: Boolean,
  Title: String,
  desc: String,
  image: String,
  address: String,
  longitude: Number,
  latitude: Number,
  date: Date,
  Participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  Tags: Array
  
  });
  
  var eventModel = mongoose.model('events', eventSchema);


module.exports = eventModel;
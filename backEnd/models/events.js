var mongoose =require('mongoose');


var eventSchema = mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  publique: Boolean,
  title: String,
  desc: String,
  image: String,
  address: String,
  longitude: Number,
  latitude: Number,
  date: Date,
  Participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  tags: Array
  
  });
  
  var eventModel = mongoose.model('events', eventSchema);


module.exports = eventModel;
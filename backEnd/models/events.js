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
  dateUTC: Date,
  dateFront: String,
  interestedParticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  confirmedParticipants: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  tags: Array

  });
  
  var eventModel = mongoose.model('events', eventSchema);


module.exports = eventModel;
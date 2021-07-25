var mongoose =require('mongoose');


var eventSchema = mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
<<<<<<< HEAD
  private: Boolean,
=======
  publique: Boolean,
>>>>>>> 41c978f496c1448e603d71422c667edfa4dbb850
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
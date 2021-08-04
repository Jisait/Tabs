var mongoose =require('mongoose');


var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: Number,
  token: String,
  avatar: String,
  phone: String,
  verified: Boolean,
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events', confirmed: Boolean}],
   });
  
  
  
  var userModel = mongoose.model('users', userSchema);


module.exports = userModel;
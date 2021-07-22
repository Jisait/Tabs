var mongoose =require('mongoose');


var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  phone: Number,
  urlToProfilePic: String,
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events', confirmed: Boolean}],
  });
  
  var userModel = mongoose.model('users', userSchema);


module.exports = userModel;
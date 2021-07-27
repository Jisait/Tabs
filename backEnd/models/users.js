var mongoose =require('mongoose');


var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  urlToProfilePic: String,
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events'}],
  });
  
  var userModel = mongoose.model('users', userSchema);


module.exports = userModel;
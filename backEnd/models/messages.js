var mongoose =require('mongoose');


var messageSchema = mongoose.Schema({
  userId: String,
  eventId: String,
  content: String,
  date: Date,
  });
  
  var messageModel = mongoose.model('messages', messageSchema);


module.exports = messageModel;

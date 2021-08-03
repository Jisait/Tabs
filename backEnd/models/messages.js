var mongoose =require('mongoose');


var messageSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  eventId: String,
  content: String,
  date: Date,
  });
  
  var messageModel = mongoose.model('messages', messageSchema);


module.exports = messageModel;

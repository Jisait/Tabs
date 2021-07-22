var mongoose =require('mongoose');
var options = {
  connectTimeoutMs: 5000,
  useNewUrlParser: true, 
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://admin:Kalanda2020&@cluster0.eh3jt.mongodb.net/tabs?retryWrites=true&w=majority',
options, 
function(err) {
  console.log(err);
}
);
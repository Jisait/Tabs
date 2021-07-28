export default function(token = null, action) {
    if(action.type == 'saveUser') {
        return action.payload;
    } else  
   if(action.type == 'deconnectUser') {
       var destroyToken = null
        return destroyToken;
    } else 

    return token
  }
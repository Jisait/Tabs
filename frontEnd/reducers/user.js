export default function(token = null, action) {
    if(action.type == 'saveUser') {
        return action.token;
    } else {
        return token;
    }
  }
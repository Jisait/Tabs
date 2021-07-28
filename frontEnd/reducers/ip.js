export default function(ip = null, action) {
    if(action.type == 'getIP') {
        return action.ip;
    } else {
        return ip;
    }
  }
export default function(tags = [], action) {
    if(action.type == 'addTags') {
        return action.tags;
    }   
    else {

    return tags}
  }
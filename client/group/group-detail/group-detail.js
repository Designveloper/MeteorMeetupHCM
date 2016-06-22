Template.groupDetailTemplate.helpers({
  'group': function(){
    var groups  = Group.find({_id: ENUM.groupId()}).fetch();
    if (groups.length){
      return groups[0];
    }
  },
  'isJoined': function(){
    return true
  },
  'pathForRoute': function(){
    return [
      {name: "All groups", _id: "", type: "route", route: "all_groups"},
      {name: this.name, _id: this._id, type: "group"}]
  }
})

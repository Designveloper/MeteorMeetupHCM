Template.groupListTemplate.helpers({
  'groups': function(){
    var user = Meteor.user();
    if (!user) return;
    var groupList = user.groups;
    if (this.type == "all"){
      return Group.find({}).fetch();
    }
    return Group.find({_id: {$in: groupList}}).fetch();
  },
  "routeForGroup": function(){
    return Meteor.absoluteUrl("group/"+this._id)
  }
})
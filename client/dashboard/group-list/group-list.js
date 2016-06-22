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
  },
  "number_member": function(){
    Meteor.subscribe('countMemberGroup',this._id);
    return Counts.get('number-member-of-group-by-id-'+this._id);
  },
  "number_upcomming_event": function(){
    Meteor.subscribe('countUpEventOfGroup',this._id);
    return Counts.get('up-event-member-of-group-by-id-'+this._id);
  }
})
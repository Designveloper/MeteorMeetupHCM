Template.groupDetailTemplate.helpers({
  'group': function () {
    var groups = Group.find({_id: ENUM.groupId()}).fetch();
    if (groups.length) {
      return groups[0];
    }
  },
  'isJoined': function () {
    return ENUM.isJoinedGroup(Meteor.user(), ENUM.groupId());
  },
  'pathForRoute': function () {
    return [
      {name: "All groups", _id: "", type: "route", route: "all_groups"},
      {name: this.name, _id: this._id, type: "group"}]
  },
  'getUpDate': function () {
    var data = {};
    data.upDate = EventData.find({
      group_id: ENUM.groupId(),
      date: {$gte: new Date()},
    }).map(function(event){
      return event.date;
    });
    return data;
  }
})
Template.groupDetailTemplate.events({
  'change input[data-name=is_joined_group]': function (e, tpl) {
    var _id = e.currentTarget.getAttribute('data-id');
    var data = ENUM.getDataByEvent(e);
    var user = Meteor.user();
    var groups = user.groups;
    var groupId = ENUM.groupId();
    var is_joined = -1;
    if (Array.isArray(groups))
      is_joined = groups.indexOf(groupId);
    if ((is_joined !== -1) === data.is_joined_group) {
      return;
    }
    if (!data.is_joined_group)
      groups.splice(is_joined, 1);
    else
      groups.push(groupId);
    Meteor.call('user_update_groups', groups);
  }
})

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
  }
})
Template.groupDetailTemplate.events({
  'change input[data-name=is_joined]': function (e, tpl) {
    var _id = e.currentTarget.getAttribute('data-id');
    var data = ENUM.getDataByEvent(e);
    var user = Meteor.user();
    var groups = user.groups;
    var groupId = ENUM.groupId();
    var is_joined = groups.indexOf(groupId);
    if ((is_joined !== -1) === data.is_joined) {
      return;
    }
    if (!data.is_joined)
      groups.splice(is_joined, 1);
    else
      groups.push(groupId);
    Meteor.call('user_update_groups',groups);
  }
})

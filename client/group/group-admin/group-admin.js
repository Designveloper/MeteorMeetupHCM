Template.groupAdminTemplate.helpers({
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
      {name: this.name, type: "url", url: "/group/" + ENUM.groupId()},
      {name: "admin"}
    ]
  },
  'getUpDate': function () {
    var data = {};
    data.upDate = EventData.find({
      group_id: ENUM.groupId(),
      date: {$gte: new Date()},
    }).map(function (event) {
      return event.date;
    });
    return data;
  },
  'detailsRoute': function () {
    return '/group/' + ENUM.groupId();
  },
  'tags': function () {
    return ENUM.getTagList('group', ENUM.groupId());
  },
  'addEventRoute': function(){
    return '/group/admin/add-event/'+ ENUM.groupId();
  }
});

Template.groupAdminTemplate.events({
  'click .add-event': function(){

  }
});

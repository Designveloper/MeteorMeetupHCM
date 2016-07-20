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
  'addEventRoute': function () {
    return '/group/admin/add-event/' + ENUM.groupId();
  },
  'doSaveName': function () {
    return function (data) {
      try {
        Group.update({_id: ENUM.groupId()}, {$set: {name: data.name}});
      } catch (err) {
        return toastr.error(err.message)
      }
      toastr.success('updating name for the group is success!')
    };
  },
  'doSaveTags': function () {
    return function (data) {
      data.tags = JSON.parse(data.tags);
      data.group_id = ENUM.groupId();
      Meteor.call('tags_update_by_group', data, function (err, res) {
        if (err) {
          return toastr.error(err.reason);
        }
        toastr.success('updating tags for the group is success!')
      })

    };
  },
  'doSaveDes': function () {
    return function (data) {
      try {
        Group.update({_id: ENUM.groupId()}, {$set: {des: data.des}});
      } catch (err) {
        return toastr.error(err.message)
      }
      toastr.success('updating description for the group is success!')
    };
  }
});

Template.groupAdminTemplate.events({
  'click .add-event': function () {
    //TODO init new Event
    Session.set('new-event-topics', null);
    Session.set('new-event-data', null);
  },
  'click .leave-group': function (e, tpl) {
    e.preventDefault();
    var answer = confirm('Are you sure to leave the groups? (You are still a member of the group)');
    if (answer) {
      Meteor.call('roles_remove', {
        type: 'group',
        role: 'organizer',
        ref: ENUM.groupId(),
        user_id: Meteor.userId()
      }, function (err, res) {
        if (err) {
          return toastr.error(err.reason);
        }
        toastr.success('You leaved the group! Back to dashboard');
        Router.go('/');
      })
    }
  }
});

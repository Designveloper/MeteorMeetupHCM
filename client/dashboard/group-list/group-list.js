Template.groupListTemplate.helpers({
  'groups': function () {
    var user = Meteor.user();
    if (!user) return;
    var groupList = user.groups;
    if (this.type == "all") {
      return Group.find({}).fetch();
    }
    if (Array.isArray(groupList))
      return Group.find({_id: {$in: groupList}}).fetch();
  },
  "routeForGroup": function () {
    return Meteor.absoluteUrl("group/" + this._id)
  },
  "number_member": function () {
    Meteor.subscribe('countMemberGroup', this._id);
    return Counts.get('number-member-of-group-by-id-' + this._id);
  },
  "number_upcomming_event": function () {
    Meteor.subscribe('countUpEventOfGroup', this._id);
    return Counts.get('up-event-member-of-group-by-id-' + this._id);
  },
  'voteValue': function () {
    Meteor.subscribe('countEventEndedByGroup', this._id);
    Meteor.subscribe('countStarByGroup', this._id);
    var total_event = Counts.get('event-of-group-by-id-' + this._id);
    if (total_event > 0) {
      return parseInt(Counts.get('total-star-of-group-by-id-' + this._id) / total_event)
    }
    return 0
  }
})
Template.memberListTemplate.helpers({
  'isBeaconList': function(){
    return this.type == 'beacon'
  },
  'members': function () {
    if (this.type == 'beacon') {
      Meteor.subscribe('voteComingForEvent', this.event_id);
      var base = {type: 'event', reference_id: this.event_id, is_here: true};
      var votes = Vote.find(base).fetch();
      if (votes.length) {
        var ids = _.map(votes, function (vote) {
          return vote.byUser;
        });
        Meteor.subscribe('userByIdsList', ids);
        return Meteor.users.find({_id: {$in: ids}}).fetch();
      }
      return null;
    }
    return Meteor.users.find({groups: ENUM.groupId()}).fetch();
  },
  'avatar': function () {
    return ENUM.getAvatarCurrentUser(this) || ENUM.NO_AVATAR;
  },
  'email': function () {
    return ENUM.getEmailCurrentUser(this);
  },
  'name': function () {
    return ENUM.getNameCurrentUser(this);
  },
  getRouteProfile: function () {
    return "/user-profile/" + this._id;
  }
})

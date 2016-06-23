Meteor.publish('countVoteValue', function (type, reference_id) {
  return Counts.publish(this, 'vote-' + type + '-' + reference_id + '-value', Vote.find({
    type: type,
    reference_id: reference_id
  }, {countFromField: 'value'}));
})
Meteor.publish('countVote', function (type, reference_id) {
  return Counts.publish(this, 'vote-' + type + '-' + reference_id, Vote.find({
    type: type,
    reference_id: reference_id,
    liked: true
  }));
})

Meteor.publish('subCountEvent', function (type, data) {
  //console.log('dataSubCount' + type, data);
  if (type === 'EventCountAge')
    return Counts.publish(this, type + '-' + data.value, Vote.find({
        type: 'event',
        reference_id: data.eventId
      }, {fields: {_id: 1, 'byUser': 1}}
    ), {
      countFromField: function (doc) {
        var user = Meteor.users.findOne(doc.byUser);
        if (!user)
          return 0;
        if (user.profile.age === "" + data.value)
          return 1;
      }
    });
  if (type === 'EventCountTitle')
    return Counts.publish(this, type + '-' + data.value, Vote.find({
        type: 'event',
        reference_id: data.eventId
      }, {fields: {_id: 1, 'byUser': 1}}
    ), {
      countFromField: function (doc) {
        var user = Meteor.users.findOne(doc.byUser);
        if (!user)
          return 0;
        if (user.profile.title === data.value)
          return 1;
      }
    });
  if (type === 'EventCountRate')
    return Counts.publish(this, type + '-' + data.value, Vote.find({
      type: 'event',
      reference_id: data.eventId,
      value: parseInt(data.value)
    }));
});

Meteor.publish('countJoinedMember', function (eventId) {
  return Counts.publish(this, 'members-join-event-' + eventId, Vote.find({
    type: 'event',
    reference_id: eventId,
    is_joined: true
  }));
})
Meteor.publish('countWentMember', function (eventId) {
  return Counts.publish(this, 'members-went-event-' + eventId, Vote.find({
    type: 'event',
    reference_id: eventId,
    is_here: true
  }));
})
Meteor.publish('countEventEndedByGroup', function (groupId) {
  var eventCursor = EventData.find({
    group_id: groupId,
    date: {$lt: new Date()}
  });
  return Counts.publish(this, 'event-of-group-by-id-' + groupId, eventCursor)
});
Meteor.publish('countStarByGroup', function (groupId) {
  var eventCursor = EventData.find({
    group_id: groupId,
    date: {$lt: new Date()}
  });
  var eventIds = eventCursor.map(function (event) {
    return event._id;
  });
  return Counts.publish(this, 'total-star-of-group-by-id-' + groupId, Vote.find({
    type: 'event',
    reference_id: {$in: eventIds},
    is_here: true
  }, {fields: {_id: 1, value: 1}}), {countFromField: 'value'})
});
Meteor.publish('countStarByEvent', function (eventId) {
  return Counts.publish(this, 'total-star-of-event-by-id-' + eventId, Vote.find({
    type: 'event',
    reference_id: eventId,
    is_here: true
  }, {fields: {_id: 1, value: 1}}), {countFromField: 'value'})
});

Meteor.publish('countMemberGroup', function (groupId) {
  return Counts.publish(this, 'number-member-of-group-by-id-' + groupId, Meteor.users.find({groups: groupId}));
})
Meteor.publish('countUpEventOfGroup', function (groupId) {
  return Counts.publish(this, 'up-event-member-of-group-by-id-' + groupId, EventData.find({date: {$gte: new Date()}}));
})
Meteor.publish('countTotal', function (type) {
  return Counts.publish(this, 'total-' + type, DB[type].find({}));
})
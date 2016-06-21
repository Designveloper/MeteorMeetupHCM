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
  console.log('dataSubCount' + type, data);
  if (type === 'EventCountAge')
    return Counts.publish(this, type + '-' + data.value, Vote.find({
      type: 'event',
      reference_id: data.eventId
    },{ fields: { _id: 1, 'byUser': 1 }}
    ),{countFromField: function(doc){
      var user = Meteor.users.findOne(doc.byUser);
      if (!user)
        return 0;
      if (user.profile.age === ""+data.value)
        return 1;
    }});
  if (type === 'EventCountTitle')
    return Counts.publish(this, type + '-' + data.value, Vote.find({
      type: 'event',
      reference_id: data.eventId
    },{ fields: { _id: 1, 'byUser': 1 }}
    ), {countFromField: function(doc){
      var user = Meteor.users.findOne(doc.byUser);
      if (!user)
        return 0;
      if (user.profile.title === data.value)
        return 1;
    }});
  if (type === 'EventCountRate')
    return Counts.publish(this, type + '-' + data.value, Vote.find({
      type: 'event',
      reference_id: data.eventId,
      value: "" + data.value
    }));
});
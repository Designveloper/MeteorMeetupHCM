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


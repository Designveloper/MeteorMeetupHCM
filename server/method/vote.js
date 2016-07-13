Meteor.methods({
  'vote_going_event': function (event_id) {
    var userId = Meteor.userId();
    if (!userId)
      return;
    var base = {type: 'event', reference_id: event_id, byUser: Meteor.userId()};
    var votes = Vote.find(base).fetch();
    if (votes.length > 0){
      if (!votes[0].is_here)
        Vote.update({_id: votes[0]._id}, {$set: {is_here: true}});
      return;
    }
    Vote.insert(_.extend(base, {is_here: true}));
  },
  'vote_out_event': function (event_id) {
    var userId = Meteor.userId();
    if (!userId)
      return;
    var base = {type: 'event', reference_id: event_id, byUser: Meteor.userId()};
    var votes = Vote.find(base).fetch();
    if (votes.length > 0) {
      if (votes[0].is_here)
        Vote.update({_id: votes[0]._id}, {$set: {is_here: false}});
    }

  },
  'vote_remove_all': function (event_id) {
    Vote.remove({type: 'event', reference_id: event_id});
  }
})

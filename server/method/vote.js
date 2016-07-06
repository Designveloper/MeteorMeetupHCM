Meteor.methods({
  'vote_going_event': function(event_id){
    var userId = Meteor.userId();
    if (!userId)
      return;
    var base = {type:'event', reference_id: event_id, byUser: Meteor.userId()};
    var votes = Vote.find(base).fetch();
    if (votes.length > 0)
      return;
    Vote.insert(_.extend(base,{is_here: true}));
  }
})

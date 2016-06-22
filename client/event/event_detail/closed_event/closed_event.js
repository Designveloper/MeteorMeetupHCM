Template.closedEventDetailTemplate.helpers({
  "user_feedback": function(){
    var votes = Vote.find({type:'event', reference_id: ENUM.eventId(), byUser: Meteor.userId()}).fetch();
    if (votes.length){
      var vote = votes[0];
      vote.isFeedback = true;
      return votes[0];
    }
  }
})
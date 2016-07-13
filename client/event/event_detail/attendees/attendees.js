Template.attendeesTemplate.helpers({
  'eventId': function(){
    return ENUM.eventId();
  }
});
Template.attendeesTemplate.events({
  'click .reset-vote-btn': function(e){
    e.preventDefault();
    Meteor.call('vote_remove_all', ENUM.eventId());
  }
})
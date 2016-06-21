Template.topic2HoldTemplate.helpers({
  'topics': function(){
    return Topic.find();
  },
  'getNumberVotes': function(){
    var votes = Vote.find({_id:this.vote_id}).fetch();
    if (votes.length)
      return votes[0].value;
  }
})

Template.topicHoldTemplate.helpers({
  'topics': function(){
    return Topic.find();
  },
  'haveMainContent': function(){
    return !!this.content
  },
  'getNumberVotes': function(){
    var votes = Vote.find({_id:this.vote_id}).fetch();
    if (votes.length)
      return votes[0].value;
  }
})

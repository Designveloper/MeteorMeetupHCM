Template.topicHoldTemplate.helpers({
  'topics': function () {
    return Topic.find();
  },
  'haveMainContent': function () {
    return !!this.content
  },
  'getNumberVotes': function () {
    return Counts.get('vote-topic' + '-' + this._id)
  },
  'isLikedTopic': function(){
    var votes = Vote.find({type:'topic', reference_id: this._id, byUser: Meteor.userId()}).fetch();
    if (votes.length){
      var vote = votes[0];
      return vote.liked;
    }
  }
})
Template.topicHoldTemplate.events({
  'change input': function(e,tpl){
    var _id = e.currentTarget.getAttribute('data-id');
    var data = ENUM.getDataByEvent(e);
    var base = {type:'topic', reference_id: _id, byUser: Meteor.userId()};
    var vote = Vote.findOne(base);
    if (vote)
      return  Vote.update({_id: vote._id},{$set: data});
    Vote.insert(_.extend(base,data));
  }
})
Template.topicHoldTemplate.helpers({
  'topics': function () {
    return Topic.find();
  },
  'haveMainContent': function () {
    return !!this.content
  },
  'getNumberVotes': function () {
    return Counts.get('vote-topic' + '-' + this._id)
  }
})

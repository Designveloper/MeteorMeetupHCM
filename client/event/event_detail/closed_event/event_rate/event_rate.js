Template.eventRateTemplate.helpers({
  'getId': function(){
    if (this.isFeedback)
      return Template.parentData(1)._id;
    return this._id;
  },
  comment: function(){
    return this.comment || "";
  },
});

Template.eventRateTemplate.events({
  'change input, change textarea': function(e,tpl){
    var _id = e.currentTarget.getAttribute('data-id');
    var data = ENUM.getDataByEvent(e);
    var base = {type:'event', reference_id: _id, byUser: Meteor.userId()};
    var vote = Vote.findOne(base);
    if (data.is_here !== false)
      data.is_here = true;
    if (vote)
      return  Vote.update({_id: vote._id},{$set: data});
    Vote.insert(_.extend(base,data));
  }
})
Template.eventDataTemplate.helpers({
  'subData': function(){
    Meteor.subscribe('voteByTypeNId', 'event', this._id);
  },
  'useEdit': function(){
    return Template.parentData(1).useEdit;
  },
  'url': function(){
    return Template.parentData(1).url;
  },
  'editEventUrl': function(){
    return '/group/admin/edit-event/' + this._id;
  }
});

Template.eventDataTemplate.events({
  'change input': function(e,tpl){
    var _id = e.currentTarget.getAttribute('data-id');
    var data = ENUM.getDataByEvent(e);
    var base = {type:'event', reference_id: _id, byUser: Meteor.userId()};
    var vote = Vote.findOne(base);
    if (vote)
      return  Vote.update({_id: vote._id},{$set: data});
    Vote.insert(_.extend(base,data));
  }
})


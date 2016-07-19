Template.topicSmallTemplate.helpers({
  'isAddNew': function(){
    return this.type === 'new';
  },
  'editUrl': function(){
    var parent = Template.parentData(1);
    if (parent.isEdit) {
      return '/group/admin/edit-event/edit-topic/' + ENUM.eventId();
    }
    return '/group/admin/add-event/edit-topic/'+ENUM.groupId()
  }
})
Template.topicSmallTemplate.events({
  'click .topic-small': function(e,tpl){
    if (tpl.data.type === 'new'){
      var parent =Template.parentData(1);
      //TODO add topic
      if (parent.isEdit)
        return Router.go('/group/admin/edit-event/add-topic/'+ENUM.eventId());
      return Router.go('/group/admin/add-event/add-topic/'+ENUM.groupId());
    }
  },
})

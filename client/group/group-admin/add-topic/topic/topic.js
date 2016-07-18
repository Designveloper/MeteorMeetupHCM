Template.topicSmallTemplate.helpers({
  'isAddNew': function(){
    return this.type === 'new';
  },
  'editUrl': function(){
    return '/group/admin/add-event/edit-topic/'+ENUM.groupId()
  }
})
Template.topicSmallTemplate.events({
  'click .topic-small': function(e,tpl){
    if (tpl.data.type === 'new'){
      //TODO add topic
      return Router.go('/group/admin/add-event/add-topic/'+ENUM.groupId());
    }
    return Router.go('/group/admin/add-event/edit-topic/'+ENUM.groupId());
  },
})

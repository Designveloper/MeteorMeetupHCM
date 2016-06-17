Template.memberListTemplate.helpers({
  'members': function(){
    return Meteor.users.find({groups: ENUM.groupId()}).fetch();
  }
})

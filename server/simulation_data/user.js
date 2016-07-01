Meteor.methods({
  'sm_user_update_groups': function(){
    var users = Meteor.users.find({}).fetch();
    var groups = Group.find({}).map(function(doc){
      return doc._id;
    });
    console.log(groups);
    for (let user of users){
      Meteor.users.update({_id: user._id},{$set : {groups: groups}});
    }
  }
})

Meteor.methods({
  'user_update_groups': function(){
    var users = Meteor.users.find({}).fetch();
    for (let user of users){
      Meteor.users.update({_id: user._id},{$set : {groups: ['1','2']}});
    }
  }
})

Meteor.methods({
  'tags_update_by_group': function(data){
    checkRolesInFunction();
    var tags = data.tags;
    var groupId = data.group_id;
    var currentData = Tags.find({ref: groupId, type: ENUM.TAGS_TYPE['group']}).fetch();
    for (let tag of currentData){
      if (tags.indexOf(tag.name) <0){
        Tags.remove({_id: tag._id});
      }
    }
    var currentTags = _.map(currentData,function(tag){
      return tag.name;
    });
    for (let tag of tags){
      if (currentTags.indexOf(tag) <0){
        Tags.upsert({
          name: tag,
          ref: groupId,
          type: ENUM.TAGS_TYPE['group']
        }, {$set: {ref: groupId}});
      }
    }
  }
})

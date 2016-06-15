Meteor.methods({
  'vote_create_sm': function(){
    var data = [{
      _id: '1',
      type: 'topic',
      value: 5
    },
      {
        _id: '2',
        type: 'topic',
        value: 3
      }];
    for (let aData of data){
      if (!Vote.findOne(aData._id)){
        Vote.insert(aData);
      }
    }
  }
})
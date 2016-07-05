Meteor.methods({
  'beacon_create_sm': function () {
    var data =
      [{
        _id: '1',
        mac: 'e90cf334ed7f',
        event_id: '1'
      }];
    EstBeacon.remove({});
    for (let aData of data){
      if (!EstBeacon.findOne(aData._id)){
        EstBeacon.insert(aData);
      }
    }
  }
})

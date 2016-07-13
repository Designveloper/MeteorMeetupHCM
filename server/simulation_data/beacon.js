Meteor.methods({
  'beacon_create_sm': function () {
    var data =
      [{
        _id: '1',
        mac: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
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

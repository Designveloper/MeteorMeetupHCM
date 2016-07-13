if (Meteor.isCordova) {
  Meteor.startup(function () {
    var name = 'event';
    var beaconTrack = new BeaconManager({name: name});
    var event_id = null;
    Meteor.subscribe('loadAllBeacons');
    setInterval(function(){
      beaconTrack.startRangingBeacons();
    },1000);
    Tracker.autorun(function () {
      if (!Meteor.user())
        return;
      var beacons = beaconTrack.getBeacons();
      var macs = _.map(_.filter(beacons, function(beacon){
        return (beacon.distance && beacon.distance < 1);
      }),function (beacon) {
        return beacon.proximityUUID.toUpperCase();
      });
      var beaconsDB = EstBeacon.find({mac: {$in: macs}}).fetch();
      if (beaconsDB.length) {
        event_id = beaconsDB[0].event_id;
        return Meteor.call('vote_going_event', event_id);
      }
      if (event_id){
        Meteor.call('vote_out_event', event_id);
      }
    })
  });
}
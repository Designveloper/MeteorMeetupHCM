if (Meteor.isCordova) {
  Meteor.startup(function () {
    var name = 'event';
    var beaconTrack = new BeaconManager({name: name});
    Meteor.subscribe('loadAllBeacons');
    setInterval(function(){
      beaconTrack.startScanningBeacons();
    },1000);
    Tracker.autorun(function () {
      if (!Meteor.user())
        return;
      var beacons = beaconTrack.getBeacons();
      var macs = _.map(beacons, function (beacon) {
        return beacon.macAddress;
      });
      var beaconsDB = EstBeacon.find({mac: {$in: macs}}).fetch();
      if (beaconsDB.length) {
        var event_id = beaconsDB[0].event_id;
        Meteor.call('vote_going_event', event_id);
      }
    })
  });
}
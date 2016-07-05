var beaconSchema = new SimpleSchema([{
  mac: {
    type: String
  },
  event_id: {
    type: String
  }
}, baseSchema])

EstBeacon = new Mongo.Collection('beacon');
EstBeacon.attachSchema(beaconSchema);

DB.beacon = EstBeacon;

testbeacon = new BeaconManager({name: 'test'});
Template.beaconShow.helpers({
  'title': function(){
    var tpl = Template.instance();
    return tpl.beacon.getTitle();
  },
  'beacons': function(){
    var tpl = Template.instance();
    return tpl.beacon.getBeacons();
  },
  'colorClasses': function(){
    var tpl = Template.instance();
    return tpl.beaconColorStyle(this.color);
  }
})
Template.beaconShow.onCreated(function(){
  this.beacon = testbeacon;
});

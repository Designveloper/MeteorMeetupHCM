Template.mapWidget.helpers({
  'mapOptions': function () {
    if (GoogleMaps.loaded()) {
      // Map initialization options
      var location = this.location || ENUM.LOCATION_DEFAULT;
      return {
        center: ENUM.getPointFromGeo(location.geo),
        zoom: 12
      };
    }
  },
});
Template.mapWidget.onCreated(function () {
  var self= this;
  GoogleMaps.ready(self.data.name, function (map) {
    self.map = map;
    if (self.data.location)
    self.marker = new google.maps.Marker({
      position: ENUM.getPointFromGeo(self.data.location.geo),
      map: map.instance
    });
  })
  this.autorun(function(){
    if (self.data.options && self.data.options.marker && self.data.options.marker.one){
      var location = GoogleMaps.instances[self.data.name].search.get();
      if (location && self.map){
        var position = ENUM.getPointFromGeometry(location.geometry)
        self.map.instance.setCenter(position);
        if (!self.marker){
          self.marker = new google.maps.Marker({
            position: position,
            map: self.map.instance
          });
          return
        }
        self.marker.setPosition(position);

      }
    }
  })
})

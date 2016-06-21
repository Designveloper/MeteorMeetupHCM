Template.mapWidget.helpers({
  'mapOptions': function () {
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: ENUM.getPointFromGeo(this.location.geo),
        zoom: 12
      };
    }
  }
})
Template.mapWidget.onCreated(function () {
  var self= this;
  GoogleMaps.ready(self.data.name, function (map) {
    return new google.maps.Marker({
      position: ENUM.getPointFromGeo(self.data.location.geo),
      map: map.instance,
      title: 'Hello World!'
    });
  })
})

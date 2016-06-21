Template.map2HoldTemplate.helpers({
  'mapOptions': function(){
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
})
Template.placeHoldTemplate.onCreated(function(){

})

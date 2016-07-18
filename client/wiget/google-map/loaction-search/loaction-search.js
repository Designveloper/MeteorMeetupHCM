Template.locationSearch.helpers({
  'configCls': function () {
    return (this.configCls)
      ? this.configCls
      : '';
  },
  'idEL': function () {
    return this.idEL
      ? this.idEL
      : 'date-input';
  },
  'name': function () {
    return this.name
      ? this.name
      : '';
  },
  'value': function () {
    var tpl = Template.instance();
    if (tpl.loaded.get()) {
      return JSON.stringify(tpl.location.get());
    }
  }
});
Template.locationSearch.onCreated(function () {
  this.loaded = new ReactiveVar(false);
})
Template.locationSearch.onRendered(function () {
  var self = this;
  self.loaded.set(true);
  if (!GoogleMaps.instances[self.data.map])
    GoogleMaps.instances[self.data.map] = {
      search: new ReactiveVar(null)
    };
  self.location = GoogleMaps.instances[self.data.map].search;
  var input = document.getElementById(self.data.map);
  this.autorun(function(){
    if (!GoogleMaps.loaded())
      return;
    var autoComplete = new google.maps.places.Autocomplete(input, {});
    autoComplete.addListener('place_changed', function () {
      var place = autoComplete.getPlace();
      if (place.geometry && place.geometry.location) {
        var position = place.geometry.location;
        place.geometry.location = {
          G: position.lat(),
          K: position.lng(),
        };
      }

      self.location.set(place)
    });

    $(input).bind('paste', function (event) {
      var txt = event.originalEvent.clipboardData.getData('text');
      if (txt) {
        ENUM.getLocationFromText(txt, function (error, position) {
          if (error) {
            toastr.error(MM.getLanguage('canNotFindLocation'));
          } else {
            var place = {
              geometry: {
                location: {
                  G: position.lat(),
                  K: position.lng(),
                },
              },
            };
            self.location.set(place)
          }
        });
      }
    });
  })

});


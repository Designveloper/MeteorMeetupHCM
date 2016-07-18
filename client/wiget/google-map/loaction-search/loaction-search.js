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
    var location = tpl.location.get();
    if (location && location.geometry) {
      setTimeout(function () {
        $(tpl.$('.location-search-value')).trigger('change');
      }, 0);
      return JSON.stringify({
        address: location.formatted_address,
        geo: ENUM.convertGeometryToGeo(location.geometry)
      });
    }
    if (this.data)
      return JSON.stringify(this.data);
  },
  'address': function () {
    if (this.data) {
      return this.data.address;
    }
  },
});
Template.locationSearch.onCreated(function () {
  if (!GoogleMaps.instances[this.data.map])
    GoogleMaps.instances[this.data.map] = {
      search: new ReactiveVar(null)
    };
  this.location = GoogleMaps.instances[this.data.map].search;
});
Template.locationSearch.onRendered(function () {
  var self = this;
  var input = document.getElementById(self.data.map);
  this.autorun(function () {
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


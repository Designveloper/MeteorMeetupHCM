Meteor.startup(function() {
  GoogleMaps.load({ v: '3', key: Meteor.settings.public.GOOGLE_MAP.map, libraries: 'geometry,places' });
  $(document).on('keyup keypress','form', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });
});
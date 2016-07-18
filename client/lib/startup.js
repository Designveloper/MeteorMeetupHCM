Meteor.startup(function() {
  GoogleMaps.load({ v: '3', key: Meteor.settings.public.GOOGLE_MAP.map, libraries: 'geometry,places' });
});
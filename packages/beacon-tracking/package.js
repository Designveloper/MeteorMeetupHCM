Package.describe({
  summary: 'iBeacon tracking',
  version: '0.0.1',
  name: 'dsv:ibeacon'
});
Cordova.depends({
  'cordova-plugin-whitelist':'1.2.2',
  'cordova-plugin-estimote': 'https://github.com/evothings/phonegap-estimotebeacons/tarball/f867379510126da4f34d13e8d92864bbee48661a'
})

Package.on_use(function (api, where) {
  api.use([
    'templating',
    'underscore'
  ], 'web.cordova');
  api.add_files(['lib/beacon-manager.js'], ['web.cordova','web.browser','client']);
  api.export(['BeaconManager'], ['web.cordova','web.browser','client']);

});


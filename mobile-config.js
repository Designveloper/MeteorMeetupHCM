/* globals App */
/* eslint-disable quote-props */

App.info({
  id: 'dsv.meteor.meetup',
  name: 'MeteorMeetup',
  description: 'Meetup open source',
  author: 'Designveloper Team',
  email: 'dev@dgroup.co',
  website: 'http://www.designveloper.com',
  version: '0.1',
});

App.icons({
  // iOS
  'iphone_2x': 'resources/icons/icon-60x60@2x.png',
  'iphone_3x': 'resources/icons/icon-60@3x.png',
  'ipad': 'resources/icons/icon-76x76.png',
  'ipad_2x': 'resources/icons/icon-76x76@2x.png',

  // Android
  'android_mdpi': 'resources/icons/icon-48x48.png',
  'android_hdpi': 'resources/icons/icon-72x72.png',
  'android_xhdpi': 'resources/icons/icon-96x96.png',
});

App.launchScreens({
  // iOS
  'iphone_2x': 'resources/splash/Default@2x~iphone.png',
  'iphone5': 'resources/splash/Default-568h@2x~iphone.png',
  'iphone6': 'resources/splash/Default-667h@2x~iphone.png',
  'iphone6p_portrait': 'resources/splash/Default-Portrait-736h@3x.png',
  'iphone6p_landscape': 'resources/splash/Default-Landscape-736h@3x.png',
  'ipad_portrait': 'resources/splash/Default-Portrait~ipad.png',
  'ipad_portrait_2x': 'resources/splash/Default-Portrait@2x~ipad.png',
  'ipad_landscape': 'resources/splash/Default-Landscape~ipad.png',
  'ipad_landscape_2x': 'resources/splash/Default-Landscape@2x~ipad.png',

  // Android
  'android_hdpi_portrait': 'resources/splash/default.png',
  'android_mdpi_portrait': 'resources/splash/default 3.png',
  'android_xhdpi_portrait': 'resources/splash/default 4.png',
  'android_xxhdpi_portrait': 'resources/splash/default 5.png',
  'android_hdpi_landscape': 'resources/splash/default 7.png',
  'android_mdpi_landscape': 'resources/splash/default 9.png',
  'android_xhdpi_landscape': 'resources/splash/default 10.png',
  'android_xxhdpi_landscape': 'resources/splash/default 11.png',
});

App.accessRule('https://meetup.designveloper.com/*', { type: 'navigation' } );
App.accessRule('http://meetup.designveloper.com/*', { type: 'navigation' } );
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
App.configurePlugin('cordova-plugin-googleplus', {
  REVERSED_CLIENT_ID: 'com.googleusercontent.apps.261317114951-3addedu5ncbloqkfh7as0rvbkdd1fg51'
});

App.configurePlugin('cordova-plugin-facebook4', {
  APP_ID: '1750863898532601',
  APP_NAME: 'open_meetup'
});
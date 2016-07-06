BeaconManager = function (opt) {
  var _options = opt || {};
  var _name = _options.name;
  var _beacons = [];
  var _event_title = {};
  //public
  var _dependence = new Deps.Dependency();

  this._isStart = false;
  this.getBeacons = function () {
    _dependence.depend();
    return _beacons;
  }
  this.setSuccess = function (res) {
    _beacons = res.beacons;
    _event_title = {
      type: 'title',
      text: res.title
    };
    _dependence.changed();
  };
  this.setError = function (err) {
    _beacons = [];
    _event_title = {
      type: 'error',
      text: err.title,
      msg: err.message
    };
    _dependence.changed();
  };
  this.getTitle = function () {
    _dependence.depend();
    return _event_title;
  }
  BeaconManager.setInstances(_name, this);
};

BeaconManager.instances = {};
BeaconManager.getInstances = function (name) {
  return BeaconManager.instances[name]
}
BeaconManager.setInstances = function (name, instance) {
  BeaconManager.instances[name] = instance;
}
BeaconManager.beaconColorStyles = [
  'style-color-unknown style-color-unknown-text',        // BeaconColorUnknown
  'style-color-mint style-color-mint-text',              // BeaconColorMintCocktail
  'style-color-ice style-color-ice-text',                // BeaconColorIcyMarshmallow
  'style-color-blueberry-dark style-color-blueberry-dark-text', // BeaconColorBlueberryPie
  'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorSweetBeetroot
  'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorCandyFloss
  'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorLemonTart
  'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorVanillaJello
  'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorLiquoriceSwirl
  'style-color-white style-color-white-text',            // BeaconColorWhite
  'style-color-transparent style-color-transparent-text' // BeaconColorTransparent
];
BeaconManager.proximityNames = [
  'unknown',
  'immediate',
  'near',
  'far'];

BeaconManager.prototype.formatDistance = function (meters) {
  if (!meters) {
    return 'Unknown';
  }

  if (meters > 1) {
    return meters.toFixed(3) + ' m';
  }
  else {
    return (meters * 100).toFixed(3) + ' cm';
  }
};
BeaconManager.prototype.formatProximity = function (proximity) {
  if (!proximity) {
    return 'Unknown';
  }

  // Eliminate bad values (just in case).
  proximity = Math.max(0, proximity);
  proximity = Math.min(3, proximity);

  // Return name for proximity.
  return BeaconManager.proximityNames[proximity];
};

BeaconManager.prototype.beaconColorStyle = function (color) {
  if (!color) {
    color = 0;
  }

  // Eliminate bad values (just in case).
  color = Math.max(0, color);
  color = Math.min(5, color);

  // Return style class for color.
  return BeaconManager.beaconColorStyles[color];
};
BeaconManager.prototype.startScanningBeacons = function () {
  if (this._isStart) return;
  this._isStart = true;
  var callback = new beaconCallBack(this);
  estimote.beacons.startEstimoteBeaconDiscovery(callback.onSuccess, callback.onError);
};
BeaconManager.prototype.stopScanningBeacons = function (type) {
  this._isStart = false;
  estimote.beacons.stopEstimoteBeaconDiscovery();
};

BeaconManager.prototype.startRangingBeacons = function () {
  if (this._isStart) return;
  this._isStart = true;
  var callback = new beaconCallBack(this);
  estimote.beacons.requestAlwaysAuthorization();

  // Start ranging.
  estimote.beacons.startRangingBeaconsInRegion(
    {}, // Empty region matches all beacons.
    callback.onSuccess,
    callback.onError);
}

BeaconManager.prototype.stopRangingBeacons = function (type) {
  this._isStart = false;
  estimote.beacons.stopRangingBeaconsInRegion({});
};

BeaconManager.prototype.startRangingNearables = function () {
  if (this._isStart) return;
  this._isStart = true;
  var callback = new beaconCallBack(this);
  estimote.nearables.startRangingForType(
    estimote.nearables.NearableTypeAll,
    callback.onSuccess,
    callback.onError);
}
BeaconManager.prototype.stopRangingNearables = function (type) {
  this._isStart = false;
  estimote.nearables.stopRanging();
};

BeaconManager.prototype.startMonitoringRegions = function () {
  if (this._isStart) return;
  this._isStart = true;
  var callback = new beaconCallBack(this);
  estimote.beacons.requestAlwaysAuthorization();

  // Start ranging.
  estimote.beacons.startMonitoringForRegion(
    {}, // Empty region matches all beacons.
    callback.onSuccess,
    callback.onError);
};

BeaconManager.prototype.stopMonitoringRegion = function (type) {
  this._isStart = false;
  estimote.beacons.stopMonitoringForRegion({});
};

BeaconManager.prototype.startMonitoringNearableTrigger = function () {
  if (this._isStart) return;
  this._isStart = true;
  var callback = new beaconCallBack(this);
  // Create a rule.
  var dogIsMovingRule = estimote.triggers.createRuleForNearable(
    estimote.nearables.NearableTypeDog,
    estimote.triggers.rules.nearableIsMoving()
  );

  // Create trigger object.
  var trigger = estimote.triggers.createTrigger(
    'DogIsMovingTrigger',
    [dogIsMovingRule]);

  // Start monitoring for trigger.
  estimote.triggers.startMonitoringForTrigger(
    trigger,
    callback.onSuccess,
    callback.onError);
};
BeaconManager.prototype.stopMonitoringNearableTrigger = function (type) {
  this._isStart = false;
  estimote.triggers.stopMonitoringForTrigger(this.trigger);
};

var beaconCallBack = function (context, title) {
  this.onSuccess = function (res) {
    res.title = title;
    context.setSuccess(res);
  }
  this.onError = function (err) {
    context._isStart = false;
    context.setError(err);
  }
}
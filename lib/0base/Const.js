ENUM = {
  NAV_LINK: [{
    route: 'dashboard',
    name: 'Dashboard'
  }, {
    route: 'all_groups',
    name: 'All Groups'
  }],
  NO_AVATAR: '/img/no-avatar.png',
  AGE_DEFAULT: 20,
  LOCATION_DEFAULT: {
    "address": "57 le thi hong gam",
    "geo": {
      "type": "Point",
      "coordinates": [106.6955088, 10.7687873]
    }
  },
  EVENT_STATUS: {
    OPENING: 0,
    ENDED: 1
  },
  ALLOW_FIELDS: {
    USER: ['profile', 'groups'],
    VOTE: ['value', 'comment', 'liked', 'is_here', 'is_joined']
  },
  CONVERT_VALUES: {
    'is_here': {
      type: 'bool',
      value: 'on'
    }
  },
  ERROR_LIST: {
    400: "bad_request",
    401: "unauthorized",
    403: "forbidden",
    500: "internal",
    5031: "payment_expired"

  },
  ERROR: function (code, msg) {
    if (ENUM.ERROR_LIST[code] && !msg)
      return new Meteor.Error(code, ENUM.ERROR_LIST[code])
    return new Meteor.Error(code, msg);
  },
  ROLES: ['guest', 'user', 'moderate', 'co-organizer', 'organizer', 'admin', 's-admin'],
  ROLES_TYPE: {
    'group': {
      'organizer': {
        text: 'organizer',
        value: 1
      },
      'co-organizer': {
        text: 'co-organizer',
        value: 2
      },
      'moderate': {
        text: 'moderate',
        value: 3
      },
      'member': {
        text: 'member',
        value: 4
      }
    },
  },
  //set permission by key
  ROLES_PERMISSION: {
    'group': {
      manage: ['co-organizer', 'organizer', 'moderate'],
      'manage_info': ['co-organizer', 'organizer'],
      'manage_members': ['co-organizer', 'organizer'],
      'manage_events': ['co-organizer', 'organizer', 'moderate'],
    },
    'event_CRUD': {
      guest: 0,
      user: 0,
      moderate: 1,
      'co-organizer': 1,
      'organizer': 1,
      'admin': 0,
      's-admin': 0
    },
  },
  USER_PUBLIC_FIELDS: {
    'services.google.email': 1,
    'services.google.picture': 1,
    'services.facebook.email': 1,
    groups: 1,
    'profile.name': 1,
    'profile.avatar': 1,
    'profile.age': 1,
    'profile.title': 1,
    'roles': 1,
  },
  TAGS_TYPE: {
    'group': {
      text: 'group',
      value: 1
    }
  },
  QuickSort: function (sortArr, isALessThanB) {
    var tmpArr = $.merge([], sortArr);
    var doAction = function (arr) {
      var left = [];
      var right = [];

      if (!$.isArray(arr)) {
        return "input is not an array";
      }

      if (arr.length <= 1) return arr;

      var pivot = arr[0];
      arr.shift();
      for (var i = 0; i < arr.length; i++) {
        isALessThanB(arr[i], pivot)
          ? left.push(arr[i])
          : right.push(arr[i]);
      }
      return $.merge($.merge(doAction(left), $.makeArray(pivot)), doAction(right));
    };
    return doAction(tmpArr);
  },
  'roles': {
    'get': function (userId, cb) {
      var user = null;
      try {
        user = Meteor.user();
      } catch (e) {
        user = Meteor.users.findOne(userId);
      }
      if (user && user.roles) {
        var list = [];
        for (let key in ENUM.ROLES_PERMISSION) {
          for (let role in user.roles) {
            (key[role])
              ? list.push(key)
              : null;
          }
        }
        return list
      }
    },
    isPass: function (key, userId) {
      var permissions = ENUM.roles.get(userId);
      return permissions.indexOf(key) != -1;
    },
    getPermssionRoles: function (type, action) {
      return ENUM.ROLES_PERMISSION[type][action];
    },
    getInContext: function (context) {
      switch (context.type) {
        case 'group':
          return context.role || 'member';
      }
    },
    getMax: function (roles) {
      return _.min(roles, function (role) {
        return role.type.value;
      });
    },
    getCurrentRoles: function (userId, groupId) {
      var roles = Roles.find({userId: userId, ref: groupId}).fetch();
      if (!roles.length)
        return "member";
      return ENUM.roles.getMax(roles).type.text;
    },
    'QUERY': function (type, role) {
      try {
        if (Array.isArray(role)) {
          return {
            'type.text': {$in: role}
          }
        }
        if (role === 'all')
          return {
            'type.text': {
              $in: _.map(Object.keys(ENUM.ROLES_TYPE[type]), function (key) {
                return ENUM.ROLES_TYPE[type][key].text;
              })
            }
          };
        return {'type.text': ENUM.ROLES_TYPE[type][role].text}
      } catch (e) {
        throw e;
      }
    },
    getRef: function (type) {
      switch (type) {
        case 'group':
          return ENUM.groupId();
      }
    },
    getRoleCurrentUser: function (type, ref, userId) {
      var roles = Roles.find({
        userId: userId || Meteor.userId(),
        ref: ref
      }).fetch();
      return roles.length
        ? ENUM.roles.getMax(roles)
        : {type: ENUM.ROLES_TYPE[type].member}
    }
  },
  funcRes: function (success) {
    return function (err, res) {
      if (err) {
        return toastr.error(err.message)
      }
      toastr.success(success);
    }
  },
  Ages: function () {
    var data = [];
    for (var i = 10; i < 100; i++) {
      data.push(i);
    }
    return data;
  },
  Titles: ['Developer', 'Team Leader', 'Manager', 'Freelancer', 'Others'],
  Rates: [0, 1, 2, 3, 4, 5],
  accountServices: {
    google: {
      id: '261317114951-f4qv166tm6692si049lmta6qa7mdh638.apps.googleusercontent.com',
      secret: 'WMrhg9hNYC311b5VVHo4Za-L'
    }
  },
  Images: {
    imagesTypes: ['image/png', 'image/jpeg', 'image/gif'],
    validateImgBase64: function (src) {
      //console.log('src',src);
      if ((!/^data:image\/png;base64,/i.test(src)) && (!/^data:image\/jpeg;base64,/i.test(src))) {
        throw new Meteor.Error("500", "ImageNotDecode");
      }
      return true;
    },
    storeImage: function (file) {
      return Images.insert(file, function (err, obj) {
        if (err) {
          return;
        }
        console.log('upload success file');
      });
    },
    storeImages: function (files) {
      var f, ref, tmp,
        indexOf = [].indexOf || function (item) {
            for (var i = 0, l = this.length; i < l; i++) {
              if (i in this && this[i] === item) return i;
            }
            return -1;
          };
      var i = 0;
      while (f = files[i]) {
        if (ref = f.type, indexOf.call(ENUM.Images.imagesTypes, ref) < 0) {
          alert('not support the file type: ' + ref);
        } else {
          tmp = ENUM.Images.storeImage(f);
        }
        i++;
      }
      return tmp._id;
    },
    dataURItoBlob: function (dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type: mimeString});
    },
    getImgFromBase64: function (dataURL, fileName) {
      var blob = ENUM.Images.dataURItoBlob(dataURL);
      var file = ENUM.Images.blobToFile(blob, fileName);
      return ENUM.Images.storeImage(file);
    },
    blobToFile: function (theBlob, fileName) {
      //A Blob() is almost a File() - it's just missing the two properties below which we will add
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    }

  },
  Attachments: {
    fileTypes: '*',
    storeFile: function (file) {
      return Attachments.insert(file, function (err, obj) {
        if (err) {
          return;
        }
        console.log('upload success file');
      });
    },
    storeFiles: function (files) {
      var f, ref, tmp,
        indexOf = [].indexOf || function (item) {
            for (var i = 0, l = this.length; i < l; i++) {
              if (i in this && this[i] === item) return i;
            }
            return -1;
          };
      var i = 0;
      while (f = files[i]) {
        if (ref = f.type, ENUM.Attachments.fileTypes !== '*' && indexOf.call(ENUM.Attachments.fileTypes, ref) < 0) {
          alert('not support the file type: ' + ref);
        } else {
          tmp = ENUM.Attachments.storeFile(f);
        }
        i++;
      }
      return tmp._id;
    }
  },
  eventId: function () {
    try {
      return Router.current().params.event_id
    } catch (e) {
      return '1';
    }
  },
  getGroupIdByEventId: function (eventId) {
    events = EventData.find(eventId).fetch();
    return events.length
      ? events[0].group_id
      : false
  },
  groupId: function () {
    try {
      var groupId = Router.current().params.group_id;
      if (!groupId) {
        var eventId = ENUM.eventId();
        if (eventId) {
          return ENUM.getGroupIdByEventId(eventId)
        }
      }
      return groupId
    } catch (e) {
      return '1';
    }
  },
  userId: function () {
    try {
      return Router.current().params.userId
    } catch (e) {
      return '';
    }
  },
  getUserById: function (userId) {
    return Meteor.users.findOne(userId);
  },
  formatDateObject: function (time) {
    if (time instanceof Date)
      return time;
    return new Date(time);
  },
  eventContent: 'Meteor for Web & Mobile Applications',
  plotPieByData: function (data, element, type, label) {
    var res = [];
    for (var value of data) {
      if (Counts.has(type + '-' + value) && Counts.get(type + '-' + value) > 0) {
        var color = localStorage.getItem('color-' + type + '-' + value);
        if (!color) {
          color = '#' + Math.floor(Math.random() * 16777215).toString(16);
          localStorage.setItem('color-' + type + '-' + value, color);
        }
        res.push({
          label: label + " " + value,
          data: Counts.get(type + '-' + value),
          color: color
        })
      }
    }
    if (res.length === 0) {
      var color = localStorage.getItem('color-' + type + '-nodata');
      if (!color) {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        localStorage.setItem('color-' + type + '-nodata', color);
      }
      res.push({
        label: 'no data',
        data: 1,
        color: color
      })
    }
    if (!$("#" + element).is(":visible")) return;
    $.plot($("#" + element), res, {
      series: {
        pie: {
          show: true
        }
      },
      grid: {
        hoverable: true
      },
      tooltip: true,
      tooltipOpts: {
        content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
        shifts: {
          x: 20,
          y: 0
        },
        defaultTheme: false
      }
    });
  },
  plotBarByData: function (data, element, type, label) {
    var res = [];
    var sum = 0;
    for (var value of data) {
      var cal = Counts.get(type + '-' + value);
      res.push([value, cal]);
      sum += cal;
    }
    if (sum == 0) {
      res[0][1] = 100;
    }
    else {
      for (var ele of res) {
        ele[1] = ele[1] * 100 / sum;
      }
    }
    if (!$("#" + element).is(":visible")) return;
    $.plot($("#" + element), [{
      label: "Rates",
      data: res
    }], {
      series: {
        bars: {
          show: true,
          barWidth: 0.6,
          fill: true,
          fillColor: {
            colors: [{
              opacity: 0.8
            }, {
              opacity: 0.8
            }]
          }
        }
      },
      xaxis: {
        tickDecimals: 0
      },
      colors: ["#1ab394"],
      grid: {
        color: "#999999",
        hoverable: true,
        clickable: true,
        tickColor: "#D4D4D4",
        borderWidth: 0
      },
      legend: {
        show: false
      },
      tooltip: true,
      tooltipOpts: {
        content: "x: %x, y: %y"
      },
      yaxis: {
        min: 0,
        max: 100
      },
    });
  },
  subCountsByData: function (data, type, eventId) {
    for (var value of data) {
      Meteor.subscribe('subCountEvent', type, {
        value: value,
        eventId: eventId
      })
    }
  },
  getEmailCurrentUser: function (user) {
    try {
      return user.services.google.email;
    } catch (e) {
      try {
        return user.emails[0].address;
      }
      catch (e) {
        try {
          return user.services.facebook.email;
        } catch (e) {
          return "";
        }
      }
    }
  },
  getNameCurrentUser: function (user) {
    return (user.profile
        ? user.profile.name
        : null) || "no name";
  },
  getAvatarCurrentUser: function (user) {
    try {
      return user.services.google.picture;
    } catch (e) {
      try {
        return user.profile.avatar;
      }
      catch (e) {
        return null;
      }
    }
  },
  checkFields: function (ALLOW_FIELDS, fields) {
    for (let field in fields) {
      let field_ex = field.split('.');
      if (ALLOW_FIELDS.indexOf(field_ex[0]) != -1)
        return false
    }
    return true;
  },
  getDataInForm: function (tpl) {
    var data = {};
    tpl.$('input,textarea,select').not('[readonly]').map(function (index, el) {
      el = $(el);
      var name = el.data('name');
      if (!name || name.trim() === "") return;
      data[name] = ENUM.getDataFromInput(el);
    });
    return data;
  },
  getDataByEvent: function (e) {
    var data = {};
    var el = $(e.currentTarget);
    var name = el.data('name');
    if (name.trim() === "") return;
    data[name] = ENUM.getDataFromInput(el);
    return data;
  },
  getDataFromInput: function (el) {
    switch (el.attr('type')) {
      case 'checkbox':
        return el.prop('checked');
      case 'file':
        var files = el.prop("files");
        if (el.data('kind') === "attachment")
          return ENUM.Attachments.storeFiles(files);
        return ENUM.Images.storeImages(files);
      default:
        var value = el.val();
        if (value && value !== "" && el.data('kind') === "JSON")
          return JSON.parse(value);
        return value.trim();
    }
  },
  convertValueByName: function (val, name) {
    if (!ENUM.CONVERT_VALUES[name]) {
      return val;
    }
    switch (ENUM.CONVERT_VALUES[name].type) {
      case 'bool':
        return val == ENUM.CONVERT_VALUES[name].value;
    }
  },
  getPointFromArr: function (arr) {
    return new google.maps.LatLng(arr[1], arr[0]);
  },
  getPointFromGeo: function (geo) {
    if (geo && Array.isArray(geo.coordinates)) {
      return ENUM.getPointFromArr(geo.coordinates);
    }
    return null;
  },
  getPointFromGeometry: function (geometry) {
    return new google.maps.LatLng(geometry.location.G, geometry.location.K);
  },
  convertGeometryToGeo: function (geometry) {
    return {
      coordinates: [geometry.location.K, geometry.location.G]
    }
  },
  isJoinedGroup: function (user, groupId) {
    var groups = user.groups;
    var is_joined = -1;
    if (Array.isArray(groups))
      is_joined = groups.indexOf(groupId);
    return (is_joined !== -1)
  },
  removeOneInArray: function (data, field, one) {
    var array = data[field];
    if (array && Array.isArray(array)) {
      var pos = array.indexOf(one);
      if (pos >= 0) {
        array.slice(pos, 1);
      }
    }
    return array;
  },
  getTagList: function (type, ref) {
    var selector = {
      type: ENUM.TAGS_TYPE[type]
    };
    if (ref) {
      selector.ref = ref;
    }
    Meteor.subscribe('allTags', type, ref);
    return _.uniq(_.map(Tags.find(selector).fetch(), function (tag) {
      return tag.name;
    }));
  },
  getLocationFromText: function (address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var loc = results[0].geometry.location;
        if (callback) callback(null, loc);
      } else {
        if (callback) callback(new Meteor.Error('can not found'), null);
      }
    })
  }
}

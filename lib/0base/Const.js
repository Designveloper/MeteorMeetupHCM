// =============================================================================
// ,,,,,,,,, ,,,
// ,,,,,,,, ,,,  Copyright:
// ,,,     ,,,          This source is subject to the Designveloper JSC
// ,,,    ,,,           All using or modify must have permission from us.
// ,,,   ,,,            http://designveloper.com
// ,,,,,,,,
// ,,,,,,,       Name:  DSVScriptTemplate
//
// Purpose:
//          Describe the purpose of the script [short version]
// Class:
//          one ; two ; three
// Functions:
//          one ; two ; three
// Called From:
//          (script) any
// Author:
//          hocnguyen
// Notes:
//          Additional information [long version]
// Changelog:
//          6/2/16 - hocnguyen - Init first revision.
// =============================================================================
ENUM = {
  eventId: '1',
  eventContent: 'Event #123ABC',
  NAV_LINK: ['home','summary'],
  NO_AVATAR: '/img/no-avatar.png',
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
  getEmailCurrentUser: function () {
    var user = Meteor.user();
    try {
      return user.services.google.email;
    } catch (e) {
      return ""
    }
  }
}

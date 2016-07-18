Router.configure({
  layoutTemplate: 'blankLayout',
  notFoundTemplate: 'notFoundLayout'
});

var requiredUser = function (router) {
  if (!Meteor.loggingIn())
    if (!Meteor.user())
      return Router.go('/signin');
  //Tracking beacon
  router.next();
};
Router.route('/', function () {
  Router.go('/dashboard');
});
Router.route('/dashboard', {
  name: 'dashboard',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('dashboardTemplate')
  },
  subscriptions: function () {
    Meteor.subscribe('eventNGroupByUser');
  }
});

Router.route('/user-profile', {
  name: 'user_profile',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('userProfileTemplate')

  }
});
Router.route('/user-profile/:userId', {
  name: 'user_profile_details',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    var userId = ENUM.userId();
    if (userId) {
      var users = Meteor.users.find({_id: userId}).fetch();
      if (!users.length)
        return this.render('404');
    }
    this.render('userProfileTemplate')

  },
  subscriptions: function () {
    Meteor.subscribe('getUserById', ENUM.userId());
  }
});

Router.route('/all-groups', {
  name: 'all_groups',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('allGroupTemplate')
  },
  subscriptions: function () {
    Meteor.subscribe('countTotal', 'group');
    Meteor.subscribe('allGroups');
    Meteor.subscribe('allUpComingEventOfUser');
  }
});

Router.route('/start-group', {
  name: 'start_group',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('startGroupTemplate')
  },
  subscriptions: function () {
  }
});

Router.route('/group/admin/:id', {
  name: 'group_admin',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('groupAdminTemplate')
  },
  subscriptions: function () {
    var groupId = ENUM.groupId();
    Meteor.subscribe('groupById', groupId);
    Meteor.subscribe('eventNMemberByGroup', groupId);
  }
})

Router.route('/group/admin/add-event/:id', {
  name: 'group_admin_add_event',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    var data = Session.get('new-event-data');
    this.render('addEventTemplate',{data: {data: data}})
  },
  subscriptions: function () {
    var groupId = ENUM.groupId();
    Meteor.subscribe('groupById', groupId);
    Meteor.subscribe('eventNMemberByGroup', groupId);
  }
});
Router.route('/group/admin/add-event/add-topic/:id', {
  name: 'group_admin_add_event_add_topic',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('newTopicTemplate')
  },
  subscriptions: function () {
    var groupId = ENUM.groupId();
    Meteor.subscribe('groupById', groupId);
    Meteor.subscribe('eventNMemberByGroup', groupId);
  }
});
Router.route('/group/admin/add-event/edit-topic/:id', {
  name: 'group_admin_add_event_edit_topic',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    var data = Session.get('current-topic-data');
    this.render('newTopicTemplate', {data : {isEdit: true, data: data}});
  },
  subscriptions: function () {
    var groupId = ENUM.groupId();
    Meteor.subscribe('groupById', groupId);
    Meteor.subscribe('eventNMemberByGroup', groupId);
  }
});

Router.route('/group/:id', {
  name: 'group_detail',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('groupDetailTemplate')
  },
  subscriptions: function () {
    var groupId = ENUM.groupId();
    Meteor.subscribe('groupById', groupId);
    Meteor.subscribe('eventNMemberByGroup', groupId);
  }
})

Router.route('/event/:id', {
  name: 'event_detail',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('eventDetailTemplate')
  },
  subscriptions: function () {
    var eventId = ENUM.eventId();
    var eventSub = Meteor.subscribe('eventById', eventId);
    Tracker.autorun(function () {
      if (eventSub.ready()) {
        var event = EventData.findOne(eventId);
        if (event)
          Meteor.subscribe('groupById', event.group_id);
      }
    });
    var topicSub = Meteor.subscribe('topicsHold', eventId);
    Tracker.autorun(function () {
      if (!eventSub.ready())
        return;
      if (topicSub.ready()) {
        var event = EventData.findOne(eventId);
        Tracker.nonreactive(function () {
          Meteor.subscribe('voteByTypeNId', 'event', eventId);
          var topics = Topic.find({event_id: eventId}).fetch();
          if (event.status == ENUM.EVENT_STATUS.OPENING) {
            Meteor.subscribe('countJoinedMember', eventId);
            for (let topic of topics) {
              Meteor.subscribe('countVote', 'topic', topic._id);
              Meteor.subscribe('voteByTypeNId', 'topic', topic._id);
            }
            return;
          }
          Meteor.subscribe('countWentMember', eventId);
          for (let topic of topics) {
            Meteor.subscribe('countVote', 'topic', topic._id);
            Meteor.subscribe('countVoteValue', 'topic', topic._id);
            Meteor.subscribe('voteByTypeNId', 'topic', topic._id);
          }
          ENUM.subCountsByData(ENUM.Ages(), 'EventCountAge', ENUM.eventId());
          ENUM.subCountsByData(ENUM.Titles, 'EventCountTitle', ENUM.eventId());
          ENUM.subCountsByData(ENUM.Rates, 'EventCountRate', ENUM.eventId());

        })
      }
    })
  }
});

//Router.route('/event/:id/attendees', {
//  name: 'event_detail_attendees',
//  action: function () {
//    this.render('attendeesTemplate')
//  }
//});
Router.route('/quiz', {
  name: 'quiz',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    Meteor.subscribe('quizData', ENUM.eventId(), ENUM.getEmailCurrentUser())
    this.render('quizTemplate')
  }
});
Router.route('/summary', {
  name: 'summary',
  subscriptions: function () {
    ENUM.subCountsByData(ENUM.Ages(), 'EventCountAge', ENUM.eventId());
    ENUM.subCountsByData(ENUM.Titles, 'EventCountTitle', ENUM.eventId());
    ENUM.subCountsByData(ENUM.Rates, 'EventCountRate', ENUM.eventId());
  },
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('eventSummaryTemplate')
  }
});

Router.route('/beacon-test', {
  name: 'beacon',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('beaconShow')
  }
});

Router.route('/signout', {
  name: 'signout',
  action: function () {
    Meteor.logout();
    if (Meteor.isCordova) {
      facebookConnectPlugin.logout(function () {

      }, function (err) {
        alert(err);
      })
    }
    Router.go('/')
  }
});
// Define these routes in a file loaded on both client and server
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});

AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join'
});

AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  path: '/forgot-password'
});

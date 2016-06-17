Router.configure({
  layoutTemplate: 'blankLayout',
  notFoundTemplate: 'notFoundLayout'
});

var requiredUser = function (router) {
  if (!Meteor.loggingIn())
    if (!Meteor.user())
      return Router.go('/signin');
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
  subscriptions: function(){
    Meteor.subscribe('eventNGroupByUser');
  }
})

Router.route('/all-groups', {
  name: 'all_groups',
  onBeforeAction: function () {
    requiredUser(this);
  },
  action: function () {
    this.render('allGroupTemplate')
  },
  subscriptions: function(){
    Meteor.subscribe('allGroups');
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
    Meteor.subscribe('groupById',groupId);
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
    Tracker.autorun(function(){
      if (eventSub.ready()){
        var event = EventData.findOne(eventId);
        if (event)
          Meteor.subscribe('groupById',event.group_id);
      }
    });
    Meteor.subscribe('topicsHold', eventId);
    Meteor.subscribe('voteTopics', 'topic')
  }
})
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
Router.route('/signout', {
  name: 'signout',
  action: function () {
    Meteor.logout();
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
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password'
});

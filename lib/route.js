Router.configure({
  layoutTemplate: 'blankLayout',
  notFoundTemplate: 'notFoundLayout'
});

var requiredUser = function(router){
  if (!Meteor.loggingIn())
    if (!Meteor.user())
      return Router.go('/signin');
  router.next();
};
Router.route('/', function(){
  Router.go('/dashboard');
});
Router.route('/dashboard',{
  name: 'dashboard',
  onBeforeAction: function(){
    requiredUser(this);
  },
  action:function(){
    this.render('dashboardTemplate')
  }
})
Router.route('/event/:id',{
  name: 'event_detail',
  onBeforeAction: function(){
    requiredUser(this);
  },
  action:function(){
    this.render('eventDetailTemplate')
  },
  subscriptions: function(){
    Meteor.subscribe('topicsHold',ENUM.eventId);
    Meteor.subscribe('voteTopics','topic')
  }
})
Router.route('/home',{
  name: 'home',
  onBeforeAction: function(){
    requiredUser(this);
  },
  action:function(){
    Meteor.subscribe('quizData',ENUM.eventId, ENUM.getEmailCurrentUser())
    this.render('quizTemplate')
  }
});
Router.route('/summary', {
  name: 'summary',
  subscriptions: function(){
    ENUM.subCountsByData(ENUM.Ages(),'EventCountAge',ENUM.eventId);
    ENUM.subCountsByData(ENUM.Titles,'EventCountTitle',ENUM.eventId);
    ENUM.subCountsByData(ENUM.Rates,'EventCountRate',ENUM.eventId);
  },
  onBeforeAction: function(){
    requiredUser(this);
  },
  action:function(){
    this.render('eventSummaryTemplate')
  }
});
Router.route('/signout', {
  name: 'signout',
  action:function(){
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

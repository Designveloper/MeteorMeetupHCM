Router.configure({
  layoutTemplate: 'blankLayout',
  notFoundTemplate: 'notFoundLayout'
});

var requiredUser = function(){
  Tracker.autorun(function() {
    if (!Meteor.userId() || !Meteor.loggingIn()) Router.go('/signin');
  });
};
Router.route('/', function(){
  Router.go('/input');
})
Router.route('/input', function(){
  this.render('inputTemplate');
},{
  name: 'input'
});
Router.route('/output', function(){
  this.render('outputTemplate');
},{
  name: 'output'
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
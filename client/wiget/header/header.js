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
Template.header.helpers({
  'haveUser': function(){
    return !!Meteor.user();
  },
  'navLink': function(){
    return ENUM.NAV_LINK;
  },
  'isNavActive': function(){
    if (Router.current().route.getName() == ""+this.route) return "active";
  },
  'getName': function(){
    var user = Meteor.user();
    if (!user) return "loading..";
    return ENUM.getNameCurrentUser(user);
  },
  'getAvatar': function(){
    var user = Meteor.user();
    if (!user) return "loading..";
    return ENUM.getAvatarCurrentUser(user) || ENUM.NO_AVATAR;
  },
  'showMenuMobile': function(){
    var height = Session.get('window-height');
    $('.navbar-collapse').css('height', height);
    return Session.get('showMenuMobile');
  }
});

Template.header.events({
  'click #signout-input': function(e){
    e.preventDefault();
    Meteor.logout();
    Router.go('/signin');
  },

  'click .navbar-nav li': function(e) {
    $('.navbar-nav li').removeClass('active');
    $(e.currentTarget).addClass('active');
  },
  'click .navbar-toggle': function(e) {
    var value = Session.get('showMenuMobile');
    Session.set('showMenuMobile', !value);
    var height = $(window).height()- $('.navbar-header').height();
    Session.set('window-height', height);

    $('.navbar-collapse').css('left', '-4px');
  },
  'click .navbar-collapse li': function(e) {
    Session.set('showMenuMobile', false);
  },
  'click .profile-btn': function(e) {
    Session.set('showMenuMobile', false);
  }
});

Template.header.onRendered(function(){
  Session.set('showMenuMobile', false);
  $('.navbar-collapse').css('left', '-500px');
});

Template.header.onCreated(function(){
  Session.set('showMenuMobile', false);
  $('.navbar-collapse').css('left', '-500px');
});

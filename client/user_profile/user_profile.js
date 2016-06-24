Template.userProfileTemplate.helpers({
  'pathForUserPf': function () {
    return [
      {name: "User Profile", _id: "", type: "active"}]
  },
  'user': function () {
    var userId = ENUM.userId();
    if (userId) {
      var users = Meteor.users.find({_id: userId}).fetch();
      if (users.length)
        return users[0];
    }
    return  Meteor.user();
  },
  'name': function () {
    return ENUM.getNameCurrentUser(this);
  },
  'email': function () {
    return ENUM.getEmailCurrentUser(this);
  },
  'Ages': function () {
    return ENUM.Ages();
  },
  'Titles': function () {
    return ENUM.Titles;
  },
  'avatar': function () {
    return ENUM.getAvatarCurrentUser(this) || ENUM.NO_AVATAR;
  },
  'isSelectedTitle': function () {
    var parent = Template.parentData(1);
    if (parent.profile && parent.profile.title === "" + this) return 'selected';
  },
  'isSelectedAge': function () {
    var parent = Template.parentData(1);
    if (parent.profile && parent.profile.age === "" + this) return 'selected';
    return (ENUM.AGE_DEFAULT === parseInt(this))
      ? 'selected'
      : '';
  },
  'isAnother': function(){
    return (ENUM.userId() && ENUM.userId() !== Meteor.userId())
  }
})
Template.userProfileTemplate.events({
  'change input, change select, change textarea': function (e, tpl) {
    if (ENUM.userId() && ENUM.userId() !== Meteor.userId())
      return;
    var el = $(e.currentTarget);
    if (el.is('[readonly]')) {
      return;
    }
    $('#profileForm').submit();
  },
  'submit #profileForm': function (e, tpl) {
    e.preventDefault();
    var data = ENUM.getDataInForm(tpl);
    Meteor.users.update({_id: Meteor.userId()}, {$set: data});
  }
});
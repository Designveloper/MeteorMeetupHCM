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
Template.inputTemplate.helpers({
  'user': function(){
    return Meteor.user();
  },
  'rating': function(){
    return [1,2,3,4,5];
  },
  'isSelected': function(){
    var user = Meteor.user();
    if ((!user || !user.quickInfo || !user.quickInfo.rating) && parseInt(this) === 5) return 'selected';
    if (user && user.quickInfo  && user.quickInfo.rating === parseInt(this)) return 'selected';
  }
})
Template.inputTemplate.events({
  'submit #quickForm': function(e,tpl) {
    e.preventDefault();
    var data = {};
    tpl.$('input,textarea,select').not('[readonly]').forEach(function () {
      var el = $(this);
      var name = el.data('name');
      var value = el.val();
      data[name] = value;
    })
    Meteor.users.update({_id: Meteor.userId()},{$set: {quickInfo: data}});
  }
})
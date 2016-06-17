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
import '../../imports/plugin/slider/slider.js'
import '../../imports/plugin/slider/slider.css'
import '../../imports/plugin/star-rating/star-rating.js'

Template.quizTemplate.helpers({
  'user': function(){
    return Meteor.user();
  },
  'email': function(){
   return ENUM.getEmailCurrentUser();
  },
  'phone': function(){
    var eventQuiz = EventQuizData.find({eventId: ENUM.eventId(), email: ENUM.getEmailCurrentUser()}).fetch();
    if (eventQuiz.length) {
      return eventQuiz[0].phone
    }
  },
  'Ages': function(){
    return ENUM.Ages();
  },
  'Titles': function(){
    return ENUM.Titles;
  },
  'avatar': function(){
    var user = Meteor.user();
    try{
      return user.services.google.picture || ENUM.NO_AVATAR;
    } catch (e){
      return ENUM.NO_AVATAR
    }
  },
  'isSelectedTitle': function(){
    var eventQuiz = EventQuizData.find({eventId: ENUM.eventId(), email: ENUM.getEmailCurrentUser()}).fetch();
    if (eventQuiz.length){
      if (eventQuiz[0].title === ""+this) return 'selected';
    }
  },
  'isSelectedAge': function(){
    var eventQuiz = EventQuizData.find({eventId: ENUM.eventId(), email: ENUM.getEmailCurrentUser()}).fetch();
    if (eventQuiz.length){
      if (eventQuiz[0].age === ""+this) return 'selected';
    }
    return (ENUM.AGE_DEFAULT === parseInt(this))?'selected':'';
  },
  'eventContent': function(){
    return ENUM.eventContent;
  },
  "rate": function(){
    var eventQuiz = EventQuizData.find({eventId: ENUM.eventId(), email: ENUM.getEmailCurrentUser()}).fetch();
    if (eventQuiz.length){
      var rating = parseInt(eventQuiz[0].rating);
      if (rating){
        var tpl = Template.instance();
        tpl.rating.updateValue(rating);
      }
    }
  },
  "comment": function(){
    var eventQuiz = EventQuizData.find({eventId: ENUM.eventId(), email: ENUM.getEmailCurrentUser()}).fetch();
    if (eventQuiz.length){
      return eventQuiz[0].comment
    }
  }
})
Template.quizTemplate.events({
  'change input, change select, change textarea': function(e,tpl){
    var el = $(e.currentTarget);
    if (el.is('[readonly]')){
      return;
    }
    $('#quizForm').submit();
  },
  'submit #quizForm': function(e,tpl) {
    e.preventDefault();
    var data = {};
    tpl.$('input,textarea,select').not('[readonly]').map(function (index, el) {
      el = $(el);
      var name = el.data('name');
      if (name.trim() ==="") return;
      var value = el.val().trim();
      data[name] = value;
    });
    data.eventId = ENUM.eventId();
    data.email =  ENUM.getEmailCurrentUser();
    if (data.email === "") return;
    var eventQuiz = EventQuizData.findOne({eventId: data.eventId, email: data.email});
    if (eventQuiz)
      EventQuizData.update({_id: eventQuiz._id},{$set: data});
    else
      EventQuizData.insert(data)
  }
});
Template.quizTemplate.onRendered(function(){
  $(this.$('#percent-input')).slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });
  this.rating = $(this.$('#rate-stars-input')).rating();


})

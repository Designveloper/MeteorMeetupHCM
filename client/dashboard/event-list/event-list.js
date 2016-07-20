Template.eventListTemplate.helpers({
  'renderData': function(){
    var data = null;
    var size = this.sizeSlide;
    var user = Meteor.user();
    if (!user) return;
    var groupList = user.groups;
    if (this.type == "details")
      data = EventData.find({
        group_id: ENUM.groupId(),
        date: {$gte: new Date()},
      }).fetch();
    else if (Array.isArray(groupList))
      data =EventData.find({group_id: {$in: groupList}, date: {$gte: new Date()}}).fetch();
    var self = this;
    setTimeout(function () {
      var dom1 = document.getElementById("event-slide");
      $(dom1).html('');
      Blaze.renderWithData(Template.eventDataTemplate, {
        data: data,
        size: size,
        useEdit: self.useEdit,
      }, dom1);
    }, 0);
    return data && !!data.length;
  }
})

Template.startGroupTemplate.helpers({
  'pathForStartGroup': function () {
    return [
      {name: "Start Group", _id: "", type: "active"}]
  }
});

Template.startGroupTemplate.events({
  'submit #groupForm': function (e, tpl) {
    e.preventDefault();
    var data = ENUM.getDataInForm(tpl);
    if (data.tags) {
      data.tags = JSON.parse(data.tags);
    }
    Meteor.call('group_create',data);


  }
})

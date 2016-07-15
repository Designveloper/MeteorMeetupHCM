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
    Meteor.call('group_create', data, function (err, groupId) {
      if (err) {
        return toastr.error(err.reason);
      }
      toastr.success('You created a new group, please wait to go to your group page');
      Router.go('/group/' + groupId);
    });
  }
})

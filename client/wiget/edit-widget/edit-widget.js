Template.editWidget.helpers({
  'configCls': function () {
    return (this.configCls)
      ? this.configCls
      : '';
  },
  'dataBlock': function () {
    return Template.parentData(1);
  }
});

Template.editWidget.events({
  'click .edit-content': function (e, tpl) {
    e.preventDefault();
    if (tpl.data.session) {
      Session.set(tpl.data.session, tpl.data.data)
    }
    switch (tpl.data.type) {
      case "url":
        Router.go(tpl.data.url);
    }
  }
})
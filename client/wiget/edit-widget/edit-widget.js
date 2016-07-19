Template.editWidget.helpers({
  'configCls': function () {
    return (this.configCls)
      ? this.configCls
      : '';
  },
  'dataBlock': function () {
    var tpl = Template.instance();
    var data = Template.parentData(1);
    data.editMode = tpl.editMode.get();
    return data;
  },
  'editMode': function(){
    var tpl = Template.instance();
    return tpl.editMode.get();
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
      case "input":
        tpl.editMode.set(true);
    }
  },
  'click .save-content': function (e, tpl) {
    e.preventDefault();
    var data = ENUM.getDataInForm(tpl);
    if (typeof tpl.data.doSave ==='function') {
      tpl.data.doSave(data);
    }
    tpl.editMode.set(false);
  },
  'click .cancel-content': function (e, tpl) {
    e.preventDefault();
    tpl.editMode.set(false);
  }
});

Template.editWidget.onCreated(function(){
  this.editMode = new ReactiveVar(false);
})
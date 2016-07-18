Template.newTopicTemplate.helpers({
  pathForRoute: function () {
    var groups = Group.find(ENUM.groupId()).fetch();
    var group_name = groups[0]
      ? groups[0].name
      : '';
    return [
      {name: "All groups", _id: "", type: "route", route: "all_groups"},
      {name: group_name, type: "url", url: "/group/" + ENUM.groupId()},
      {
        name: "New Event",
        type: "url",
        url: "/group/admin/add-event/" + ENUM.groupId()
      },
      {name: this.isEdit?"Edit Topic":"New Topic"}
    ]
  },
  addEventRoute: function () {
    return "/group/admin/add-event/" + ENUM.groupId();
  },
  submitBtn: function(){
    return this.isEdit?"Save Topic":"Add Topic"
  }
});

Template.newTopicTemplate.events({
  'submit #addTopicForm': function (e,tpl) {
    e.preventDefault();
    var data = ENUM.getDataInForm(tpl);
    var topics = [];
    var eventData = Session.get('new-event-topics');
    if (Array.isArray(eventData)) {
      topics = eventData;
    }
    if (tpl.data && tpl.data.isEdit){
      topics[tpl.data.data.index] = data
    } else {
      data.index = topics.length;
      topics.push(data);
    }
    Session.set('new-event-topics', topics);
    Router.go("/group/admin/add-event/" + ENUM.groupId());
  }
})

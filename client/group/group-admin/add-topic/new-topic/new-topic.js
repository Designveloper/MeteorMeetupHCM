Template.newTopicTemplate.helpers({
  pathForRoute: function () {
    var eventId = ENUM.eventId();
    if (this.isEditEvent) {
      var events = EventData.find(eventId).fetch();
      var groupId = events[0]
        ? events[0].group_id
        : '';
      var groups = Group.find(groupId).fetch();
      var group_name = groups[0]
        ? groups[0].name
        : '';
    }
    else {
      var groupId = ENUM.groupId();
      var groups = Group.find(ENUM.groupId()).fetch();
      var group_name = groups[0]
        ? groups[0].name
        : '';
    }
    var routeEvent = this.isEditEvent
      ?
    {
      name: "Edit Event",
      type: "url",
      url: "/group/admin/edit-event/" + eventId
    }
      :
    {
      name: "Add Event",
      type: "url",
      url: "/group/admin/add-event/" + groupId
    };
    return [
      {name: "All groups", _id: "", type: "route", route: "all_groups"},
      {name: group_name, type: "url", url: "/group/" + groupId},
      routeEvent,
      {
        name: this.isEdit
          ? "Edit Topic"
          : "New Topic"
      }
    ]
  },
  addEventRoute: function () {
    if (this.isEditEvent)
      return "/group/admin/edit-event/" + ENUM.groupId();
    return "/group/admin/add-event/" + ENUM.groupId();
  },
  submitBtn: function () {
    return this.isEdit
      ? "Save Topic"
      : "Add Topic"
  }
});

Template.newTopicTemplate.events({
  'submit #addTopicForm': function (e, tpl) {
    e.preventDefault();
    var data = ENUM.getDataInForm(tpl);
    var topics = [];
    var eventData = Session.get('new-event-topics');
    if (Array.isArray(eventData)) {
      topics = eventData;
    }
    if (tpl.data && tpl.data.isEdit) {
      data  = _.extend(topics[tpl.data.data.index], data);
      topics[tpl.data.data.index] = data;
    } else {
      data.index = topics.length;
      topics.push(data);
    }
    Session.set('new-event-topics', topics);
    var eventRoute = "add-event";
    var idRoute = ENUM.groupId();
    if (tpl.data && tpl.data.isEditEvent) {
      eventRoute = "edit-event";
      idRoute = ENUM.eventId();
      data.event_id = idRoute;
      if (data._id)
        Topic.update({_id: data._id}, {$set: data});
      else {
        delete data.index;
        Topic.insert(data);
      }
    }

    Router.go("/group/admin/" + eventRoute + "/" + idRoute);
  }
})

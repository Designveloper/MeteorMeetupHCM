Template.addEventTemplate.helpers({
  'instanceForMap': function(){
    var tpl = Template.instance();
    return tpl.instanceName;
  },
  'mapOptions': function(){
    return {
      marker : {
        one: true
      }
    }
  },
  'pathForRoute': function(){
    if (this.isEdit){
      var events = EventData.find(ENUM.eventId()).fetch();
      var groupId = events[0]?events[0].group_id:'';
      var groups = Group.find(groupId).fetch();
      var group_name = groups[0]?groups[0].name:'';
    }
    else {
      var groupId = ENUM.groupId();
      var groups = Group.find(ENUM.groupId()).fetch();
      var group_name = groups[0]
        ? groups[0].name
        : '';
    }
    return[
      {name: "All groups", _id: "", type: "route", route: "all_groups"},
      {name: group_name, type: "url", url: "/group/" + groupId},
      {name: "Admin tools", type: "url", url: "/group/admin/" + groupId},
      {name: this.isEdit?"Edit Event":"New Event"}
    ]
  },
  submitBtn: function(){
    return this.isEdit?"Save Event":"Add Event"
  }
});

Template.addEventTemplate.onCreated(function(){
  var pos = Object.keys(GoogleMaps.instances).length;
  this.instanceName ='map-add-event-'+pos;
  if (!GoogleMaps.instances[this.instanceName]){
    GoogleMaps.instances[this.instanceName] = {
      search: new ReactiveVar(null)
    };
  }
})

Template.addEventTemplate.events({
  'change input, change textarea, change select': function(e,tpl){
    var el = $(e.currentTarget);
    var name = el.data('name');
    if (!name || name === "")
      return;
    var data = ENUM.getDataInForm(tpl);
    var current = Session.get('new-event-data');
    Session.set('new-event-data', _.extend(current,data));
  },
  'submit #addEventForm': function(e,tpl){
    e.preventDefault();
    var data = ENUM.getDataInForm(tpl);
    if (tpl.data.isEdit)
    {
      data.event_id = ENUM.eventId();
      return  Meteor.call('event_update',data, function(err,res){
        if (err){
          return toastr.error(err.reason);
        }
        var current =  Session.get('new-event-data');
        Router.go('/group/admin/'+current.group_id);
      });
    }
    data.topics = Session.get('new-event-topics');
    Meteor.call('event_create',data, function(err,res){
      if (err){
        return toastr.error(err.reason);
      }
      Router.go('/group/admin/'+ENUM.groupId());
    });
  }
})
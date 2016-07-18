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
    var groups = Group.find(ENUM.groupId()).fetch();
    var group_name = groups[0]?groups[0].name:'';
    return[
      {name: "All groups", _id: "", type: "route", route: "all_groups"},
      {name: group_name, type: "url", url: "/group/" + ENUM.groupId()},
      {name: "New Event"}
    ]
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
    Session.set('new-event-data',data);
  },
  'submit #addEventForm': function(e,tpl){
    e.preventDefault();
    var data = ENUM.getDataInForm(tpl);
    data.topics = Session.get('new-event-topics');
    data.group_id = ENUM.groupId();
    Meteor.call('event_create',data, function(err,res){
      if (err){
        return toastr.error(err.reason);
      }
      Router.go('/group/admin/'+ENUM.groupId());
    });
  }
})
Template.breadcrumb.helpers({
  'getPaths': function(){
    var path = this.path;
    path[path.length -1].isEnd=  true;
    return path;
  },
  'getRoute': function(){
    switch (this.type) {
      case "group":
        return Meteor.absoluteUrl('group/'+this._id);
        break;
    }
  },
  'isRoute': function(){
    return this.type === 'route'
  }
})

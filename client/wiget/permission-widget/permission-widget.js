Template.permissionWidget.onCreated(function(){
  var role = this.data.role;
  try {
    role = JSON.parse(role);
  }catch (e){}
  requirePermission({
    type: this.data.type,
    role: role
  })
});
var requirePermission = function(permission){
  var tpl = Template.instance();
  tpl.autorun(function(){
    if (!Meteor.user() && !Meteor.loggingIn())
      return;
    var ref = ENUM.roles.getRef(permission.type);
    var roles = Roles.find(_.extend(ENUM.roles.QUERY(permission.role, permission.role),{userId: Meteor.userId(),ref: ref})).fetch();
    if (!roles.length){
      Router.go('/');
    }
  })
};
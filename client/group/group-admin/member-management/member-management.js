Template.memberManagementTemplate.helpers({
  'members': function () {
    return Meteor.users.find({groups: ENUM.groupId()}).fetch();
  },
  'doSaveRoles': function () {
    var userId = this._id;
    return function (data) {
      data.user_id = userId;
      data.ref = ENUM.groupId();
      data.type = 'group';
      Meteor.call('roles_update', data, ENUM.funcRes('updating role for the user is success!'));
    };
  },
  rolesForGroup: function () {
    return Object.keys(ENUM.ROLES_TYPE.group);
  },
  isSelected: function () {
    var parent = Template.parentData(1);
    var userId = parent._id;
    var role = ENUM.roles.getCurrentRoles(userId, ENUM.groupId());
    if (role)
      return this.toString() === ENUM.roles.getInContext({
          type: 'group',
          role: role
        });
  },
  currentRole: function () {
    var parent = Template.parentData(1);
    var userId = parent._id;
    var role = ENUM.roles.getCurrentRoles(userId, ENUM.groupId());
    if (role)
      return ENUM.roles.getInContext({
        type: 'group',
        role: role
      });
  }
});

Template.memberManagementTemplate.events({
  'click .remove-member': function (e, tpl) {
    var el = $(e.currentTarget);
    var data = {
      user_id: el.data('id'),
      ref: ENUM.groupId(),
      type: 'group',
      role: 'all'
    };
    Meteor.call('roles_remove',data, ENUM.funcRes('Remove the member out the group success!'));
  }
})

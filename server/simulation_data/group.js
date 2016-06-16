Meteor.methods({
  'group_create_sm': function () {
    var data =
      [{
        _id: '1',
        image: '/img/home.png',
        name: 'Meteor HCM',
      },
        {
          _id: '2',
          image: '/img/home.png',
          name: 'Javascript HCM',
        }]
    for (let aData of data){
      if (!Group.findOne(aData._id)){
        Group.insert(aData);
      }
    }
  }
})
Meteor.methods({
  'vote_create_sm': function () {
    var data = [{
      type: 'topic',
      value: 5,
      reference_id: '1',
      byUser: '1'
    },
      {
        type: 'topic',
        value: 3,
        reference_id: '1',
        byUser: '2'
      },
      {
        type: 'topic',
        value: 5,
        reference_id: '1',
        byUser: '3'
      },
      {
        type: 'topic',
        value: 2,
        reference_id: '1',
        byUser: '4'
      },
      {
        type: 'topic',
        value: 5,
        reference_id: '2',
        byUser: '1'
      },
      {
        type: 'topic',
        value: 4,
        reference_id: '2',
        byUser: '2'
      },
      {
        type: 'topic',
        value: 1,
        reference_id: '2',
        byUser: '3'
      },
      {
        type: 'topic',
        value: 5,
        reference_id: '3',
        byUser: '1'
      },
      {
        type: 'topic',
        value: 2,
        reference_id: '3',
        byUser: '2'
      },
      {
        type: 'topic',
        value: 5,
        reference_id: '3',
        byUser: '3'
      },
      {
        type: 'topic',
        value: 2,
        reference_id: '3',
        byUser: '4'
      },
      {
        type: 'topic',
        value: 5,
        reference_id: '3',
        byUser: '5'
      },
      {
        type: 'topic',
        value: 1,
        reference_id: '4',
        byUser: '1'
      },
      {
        type: 'topic',
        value: 1,
        reference_id: '4',
        byUser: '2'
      },
      {
        type: 'topic',
        value: 2,
        reference_id: '4',
        byUser: '3'
      }];
    Vote.remove({});
    for (let aData of data) {
      if (!Vote.findOne(aData._id)) {
        try {
          Vote.insert(aData);
        } catch (e){
          console.error(e);
        }
      }
    }
  }
})

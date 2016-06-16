Meteor.methods({
  'topic_create_sm': function () {
    var data =
      [{
        _id: '1',
        image: '/img/home.png',
        title: 'Meteor for Android Application',
        timeEst: 30,
        vote_id: '1',
        event_id: 1
      },
      {
        _id: '2',
        image: '/img/home.png',
        title: 'Hello world to meteor',
        timeEst: 30,
        vote_id: '2',
        content: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
        ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
        'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
        'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
        'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
        ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
        'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
        ' legere doming virtute ad. Prodesset sadipscing id eam.',

        event_id: 1
      }]
    for (let aData of data){
      if (!Topic.findOne(aData._id)){
        Topic.insert(aData);
      }
    }
  }
})
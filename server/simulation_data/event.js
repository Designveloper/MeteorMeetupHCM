Meteor.methods({
  'event_create_sm': function () {
    var date = new Date();
    date.setDate(date.getDate() + 2);
    var date2 = new Date();
    date2.setDate(date2.getDate() - 2);
    var data =
      [{
        _id: '1',
        group_id: '1',
        image: '/img/home.png',
        name: 'Meteor get start',
        location: {
          address: "57 le thi hong gam",
          geo: {
            "type": "Point",
            "coordinates": [106.6955088, 10.7687873]
          }
        },
        date: date,
        description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
        ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
        'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
        'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
        'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
        ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
        'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
        ' legere doming virtute ad. Prodesset sadipscing id eam.',
        status: ENUM.EVENT_STATUS.OPENING,
        max_mem: 50
      },
        {
          group_id: '1',
          image: '/img/home.png',
          name: 'Meteor get start',
          location: {
            address: "57 le thi hong gam",
            geo: {
              "type": "Point",
              "coordinates": [106.6955088, 10.7687873]
            }
          },
          date: date,
          description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
          ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
          'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
          'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
          'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
          ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
          'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
          ' legere doming virtute ad. Prodesset sadipscing id eam.',
          status: ENUM.EVENT_STATUS.OPENING,
          max_mem: 50
        },{
          group_id: '1',
          image: '/img/home.png',
          name: 'Meteor get start',
          location: {
            address: "57 le thi hong gam",
            geo: {
              "type": "Point",
              "coordinates": [106.6955088, 10.7687873]
            }
          },
          date: date,
          description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
          ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
          'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
          'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
          'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
          ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
          'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
          ' legere doming virtute ad. Prodesset sadipscing id eam.',
          status: ENUM.EVENT_STATUS.OPENING,
          max_mem: 50
        },{
          group_id: '1',
          image: '/img/home.png',
          name: 'Meteor get start',
          location: {
            address: "57 le thi hong gam",
            geo: {
              "type": "Point",
              "coordinates": [106.6955088, 10.7687873]
            }
          },
          date: date,
          description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
          ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
          'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
          'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
          'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
          ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
          'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
          ' legere doming virtute ad. Prodesset sadipscing id eam.',
          status: ENUM.EVENT_STATUS.OPENING,
          max_mem: 50
        },{
          group_id: '1',
          image: '/img/home.png',
          name: 'Meteor get start',
          location: {
            address: "57 le thi hong gam",
            geo: {
              "type": "Point",
              "coordinates": [106.6955088, 10.7687873]
            }
          },
          date: date,
          description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
          ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
          'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
          'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
          'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
          ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
          'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
          ' legere doming virtute ad. Prodesset sadipscing id eam.',
          status: ENUM.EVENT_STATUS.OPENING,
          max_mem: 50
        },{
          group_id: '1',
          image: '/img/home.png',
          name: 'Meteor get start',
          location: {
            address: "57 le thi hong gam",
            geo: {
              "type": "Point",
              "coordinates": [106.6955088, 10.7687873]
            }
          },
          date: date,
          description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
          ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
          'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
          'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
          'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
          ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
          'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
          ' legere doming virtute ad. Prodesset sadipscing id eam.',
          status: ENUM.EVENT_STATUS.OPENING,
          max_mem: 50
        }, {
        group_id: '1',
        image: '/img/home.png',
        name: 'Meteor get start',
        location: {
          address: "57 le thi hong gam",
          geo: {
            "type": "Point",
            "coordinates": [106.6955088, 10.7687873]
          }
        },
        date: date,
        description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
        ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
        'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
        'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
        'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
        ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
        'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
        ' legere doming virtute ad. Prodesset sadipscing id eam.',
        status: ENUM.EVENT_STATUS.OPENING,
        max_mem: 50
      },
        {
          _id: '2',
          group_id: '1',
          image: '/img/home.png',
          name: 'Meteor react',
          location: {
            address: "43 Dien Bien Phu",
            geo: {
              "type": "Point",
              "coordinates": [106.696371, 10.7912113]
            }
          },
          date: date2,
          description: 'Lorem ipsum dolor sit amet, vim ad fierent incorrupte disputationi,' +
          ' te eam debitis appellantur, ea malorum ceteros ius. Natum probatus definiti' +
          'onem id quo, utinam sententiae duo in. Et timeam detraxit vix, eu aeterno defi' +
          'nitiones nam. Nec ex dolore reprimique.Vivendo fuisset definitiones vim ne, ad ' +
          'nobis dictas epicurei vis. Solum nostro scripta ex mel, quidam dolorum salutatus' +
          ' id pri, ex nostrud copiosae platonem mei. Sit mollis rationibus et, vix at ' +
          'quando signiferumque, at illum constituto mei. Ei eum aliquid facilisis, sit' +
          ' legere doming virtute ad. Prodesset sadipscing id eam.',
          status: ENUM.EVENT_STATUS.ENDED,
          max_mem: 20
        }]
    EventData.remove({});
    for (let aData of data) {
      if (!EventData.findOne(aData._id)) {
        EventData.insert(aData);
      }
    }
  }
})
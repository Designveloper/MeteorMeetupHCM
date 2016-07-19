baseSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function(){
      if (this.isInsert){
        return new Date();
      }
    },
    optional: true
  },
  updatedAt: {
    type: Date,
    autoValue: function(){
      if (this.isInsert || this.isUpdate || this.isUpsert){
        return new Date();
      }
    },
    optional: true
  },
  delete_flg: {
    type: Number,
    autoValue: function(){
      if (this.isInsert || this.isUpsert){
        return 0;
      }
    }
  }
})

geoSchema = new SimpleSchema({
  address: {
    type: String
  },
  geo: {
    type: Object,
    blackbox: true
  }
});
typeSchema = new SimpleSchema({
  text: {
    type: String
  },
  value: {
    type: Number,
  }
});
DB = {};
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
  }
})

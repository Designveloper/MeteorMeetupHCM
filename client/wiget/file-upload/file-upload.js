Template.fileUpload.helpers({
  'configCls': function(){
    return (this.configCls)?this.configCls:'';
  },
  'iconCls': function(){
    return (this.iconCls)?this.iconCls:'';
  },
  'name': function(){
    return this.name?this.name:'attachment';
  },
  'idEL': function(){
    return this.idEL?this.idEL:'attachment-input';
  },
  'nameFile': function(){
    var tpl = Template.instance();
    var file = tpl.file.get() || this.data;
    if (file) {
      Meteor.subscribe('attachById', file);
      var files = Attachments.find({_id: file}).fetch();
      if (files.length)
        return files[0].name();
      return file;
    }
    return ""
  },
  'file': function(){
    var tpl = Template.instance();
    setTimeout(function(){
      tpl.$(".upload-file-value").trigger('change');
    },0);
    return tpl.file.get();
  }
})
Template.fileUpload.events({
  'click .file-upload': function(e,tpl){
    $(tpl.$('.upload-file-input')).click();
  },
  'change input.upload-file-input': function(e,tpl){
    tpl.file.set(ENUM.getDataFromInput($(e.currentTarget)))
  }
})
Template.fileUpload.onCreated(function(){
  var data = this.data?this.data.data:null;
  this.file = new ReactiveVar(data);
})

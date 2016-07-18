Template.avatarUpload.helpers({
  'image': function(){
    var tpl = Template.instance();
    var image = tpl.image.get() || this.data;
    if (image) {
      Meteor.subscribe('imageById', image);
      var imgs = Images.find({_id: image}).fetch();
      if (imgs.length)
        return imgs[0].url();
      return image;
    }
    return "/img/no-avatar.png"
  },
  'configCls': function(){
    return (this.configCls)?this.configCls:'';
  },
  'name': function(){
    return this.name?this.name:'avatar';
  }
});

Template.avatarUpload.events({
  'click img': function(e,tpl){
    $(tpl.$('input')).click();
  },
  'change input.upload-file-input': function(e,tpl){
    tpl.image.set(ENUM.getDataFromInput($(e.currentTarget)))
  }
})
Template.avatarUpload.onCreated(function(){
  this.image = new ReactiveVar(null);
})

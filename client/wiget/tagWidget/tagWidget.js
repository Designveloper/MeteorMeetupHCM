Template.tagWidget.helpers({
  'idEL': function(){
    return this.idEL?this.idEL:'tag-input';
  },
  'labelTag': function(){
    return this.labelTag?this.labelTag:'Tag';
  },
  'name': function(){
    return this.name?this.name:'';
  }
});
Template.tagWidget.onRendered(function(){
  var list = [];
  Meteor.subscribe('allTags');
  this.autorun(function(){
    list = _.uniq(_.map(Tags.find().fetch(),function(tag){
      return tag.name;
    }));
  });
  var textarea = $(this.$('textarea'));
  var name = textarea.data('name');
  textarea.textext({
      plugins : 'tags autocomplete'
    })
    .bind('getSuggestions', function(e, data)
    {
      var textext = $(e.target).textext()[0],
          query = (data ? data.query : '') || '';

      $(this).trigger(
        'setSuggestions',
        { result : textext.itemManager().filter(list, query) }
      );
    });
  textarea.siblings('input').data('name',name);

})

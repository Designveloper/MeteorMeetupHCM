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
  this.autorun(function(){
    list = ENUM.getTagList('group');
  });
  var textarea = $(this.$('textarea'));
  var name = textarea.data('name');
  var data = this.data?this.data.data:[];
  textarea.textext({
      plugins : 'tags autocomplete',
      tags: {
        items: data
      }
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

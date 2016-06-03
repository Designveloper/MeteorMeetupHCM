Counts = new Mongo.Collection('counts');

Counts.get = function countsGet(name) {
  var count = this.findOne({name: name}, {sort: {updatedAt: -1}});
  return count && count.count || 0;
};

Counts.has = function countsHas(name) {
  return !!this.find({name: name}).fetch().length;
};

if (Package.templating) {
  Package.templating.Template.registerHelper('getPublishedCount', function (name) {
    return Counts.get(name);
  });

  Package.templating.Template.registerHelper('hasPublishedCount', function (name) {
    return Counts.has(name);
  });
}

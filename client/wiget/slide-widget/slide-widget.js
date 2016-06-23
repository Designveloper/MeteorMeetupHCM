var slideSizeList = {
  "1/2": [2, 1, 1],
  "1": [4, 2, 1]
};
var paddingSizeList = {
  "1/2": [40,20,20],
  "1": [60,40,40],
}
Template.slideWidget.helpers({
  data: function () {
    var tpl = Template.instance();
    var hasData = !!this.data;
    var size = this.size
      ? this.size
      : 1;
    var slideShow = slideSizeList[size];
    var padding = paddingSizeList[size];
    if (hasData)
      setTimeout(function () {
        $(tpl.$('.slide-widget')).slick({
          // centerMode: true,
          centerPadding: padding[0]+'px',
          slidesToShow: slideShow[0],
          slidesToScroll: 1,
          arrows: true,
          infinite: false,
          nextArrow: '<span class="next-arrow"></span>',
          prevArrow: '<span class="prev-arrow"></span>',
          responsive: [{
            breakpoint: 1024,
            settings: {
              arrows: true,
              // centerMode: true,
              centerPadding: padding[1]+'px',
              slidesToShow: slideShow[1]
            }
          }, {
            breakpoint: 768,
            settings: {
              arrows: true,
              // centerMode: true,
              centerPadding: padding[2]+'px',
              slidesToShow: slideShow[2]
            }
          }]
        })
      }, 0)
    return this.data;
  }
})

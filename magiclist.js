// Write your package code here!
MagicList = {

  subscribe: function() {

    var limit, skip;

    switch(magicList.listType) {
      case 'page':
        limit = magicList.size;
        skip = magicList.size*parseInt(magicList.page.get());
        break;
      case 'loadMore':
        limit = magicList.size*parseInt(magicList.page.get());
        skip = 0;
        break;
      case 'infinite':
        limit = magicList.size*parseInt(magicList.page.get());
        skip = 0;
        $(window).bind('scroll', MagicList.infiniteScroll);
    }

    magicList.sub = Meteor.subscribe(magicList.data.subscribe, {limit: limit, skip: skip});
  },

  // Function to run when list type is infinite
  infiniteScroll: _.debounce(function() {

    threshold = $(window).scrollTop() +
      $(window).height() -
      $('.' + magicList.containerClass).height() -
      $('.' + magicList.containerClass).offset().top;

    if(threshold >= -500) {
      magicList.page.set(magicList.page.get() + 1);
    }

  }, 100)
};

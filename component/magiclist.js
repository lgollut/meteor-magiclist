Template.magicList.helpers({
  containerClass: function() {
    return Template.instance().containerClass;
  }
});

Template.magicList.onCreated(function() {

  // Save template reference
  magicList = this;

  // Set page counter reactive var
  magicList.page = new ReactiveVar(1);

  // Define size of the page
  magicList.size = parseInt(magicList.data.size) || 20;

  // Set the container class with default to magicList
  magicList.containerClass = magicList.data.containerClass || 'magicList';

  // Set list type
  magicList.listType = magicList.data.type || 'infinite';

  // Resub whenever page number changes
  magicList.autorun(MagicList.subscribe);

});

Template.magicList.onRendered(function() {

  // Current results
  var fetched = [];

  // Create a view with each results
  magicList.view = Blaze.Each(function() {

    // But only if sub is ready
    if(magicList.sub.ready())
      fetched = magicList.data.collection.find().fetch();

    return fetched;

  }, function() {

    // Use the user defined template to create subviews
    return Template[magicList.data.template];
  });

  // Render the previously created view within the user defined container
  magicList.renderedList = Blaze.render(magicList.view, $('.' + magicList.containerClass).get(0));

});

Template.magicList.onDestroyed(function() {
  // Unbind the scroll event if any
  $(window).unbind('scroll', MagicList.infiniteScroll);

  // Stop the subsciption
  magicList.sub.stop();

  // Remove the list from template
  Blaze.remove(magicList.renderedList);
});

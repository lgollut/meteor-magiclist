Package.describe({
  name: 'lgollut:magiclist',
  version: '0.0.1',
  summary: 'Create pagination and infinite scroll functionalities of random collection data.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('underscore');
  api.use('templating');
  api.use('reactive-var');

  api.addFiles('magiclist.js');
  api.addFiles('component/magiclist.html', 'client');
  api.addFiles('component/magiclist.js', 'client');
});

Package.onTest(function(api) {

});

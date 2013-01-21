(function() {

  requirejs.config({
    paths: {
      jquery: 'vendor/jquery',
      miniColors: 'vendor/jquery.miniColors',
      text: 'vendor/text'
    },
    shim: {
      'miniColors': {
        deps: ['jquery']
      }
    }
  });

  require(["controller"], function(controller) {
    return controller.setup();
  });

}).call(this);

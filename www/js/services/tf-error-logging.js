angular.module('starter.services')
  .service('TFErrorLogging', [function() {
    var self = this;

    self.log = function(source, err, additional) {
      console.error(source, err, additional);
    };

  }])
;

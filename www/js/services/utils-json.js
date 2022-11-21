angular.module('starter.services')
  .service('UtilsJSON', [function() {
    var self = this;

    self.parse = function(str, reviver) {
      var data;
      try {
        if (typeof reviver === 'function') {
          data = JSON.parse(str, reviver);
        } else {
          data = JSON.parse(str);
        }
      }
      catch(err) {
        console.error('UtilsJSON.parse', err, str);
        data = null;
      }
      return data;
    };
  }]);

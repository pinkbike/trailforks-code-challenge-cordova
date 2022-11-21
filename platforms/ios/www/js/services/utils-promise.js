angular.module('starter.services')
  .service('UtilsPromise', ['$q', function($q) {
    var self = this;

    self.runFnInSequence = function(fn, arrOrObj) {
      var deferred = $q.defer();

      var results, keys;
      if (angular.isArray(arrOrObj)) {
        results = [];
        keys = [];

        for (var i = 0; i < arrOrObj.length; i++) {
          keys.push(i);
        }
      }
      else {
        results = {};
        keys = [];

        for (var key in arrOrObj) {
          keys.push(key);
        }
      }

      var index = 0;

      console.dir(results);
      console.dir(keys);
      next();

      function next() {
        var item = arrOrObj[keys[index]];
        index++;

        if (index <= keys.length) {
          fn(item)
            .then(function(result) {
              console.log('one done');
              results[keys[index-1]] = result;
              return next();
            });
        }
        else {
          console.log('all done!');
          deferred.resolve(results);
        }
      }

      return deferred.promise;
    };
  }]);

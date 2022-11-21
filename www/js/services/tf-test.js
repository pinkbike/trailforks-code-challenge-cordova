angular.module('starter.services')
  .service('TFTest', ['TFAPI', function(TFAPI) {
    var self = this;

    self.getReportsByTrail = function(trailid) {
      var params = {
        filter: 'nid::'+trailid+';type::trail',
        fields: 'reportid,status,condition,latitude,watchmen,created,description,username'
      };
      return TFAPI.publicAPI('reports', 'GET', params)
        .then(function(results) {
          if (results.data) {
            angular.forEach(results.data, function(item, i) {
              results.data[i].ts = results.data[i].created * 1000; // angular uses microsecons
            });
            return results.data;
          } else {
            return false;
          }
        });
    };

  }]);

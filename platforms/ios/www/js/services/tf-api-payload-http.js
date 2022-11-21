angular.module('starter.services')
  .factory('TFAPIPayloadHttp', ['$rootScope', '$http', function($rootScope, $http) {
    return function() {
      return $http.apply(this, arguments)
        .then(checkForPayload);
    };

    function checkForPayload(response) {
      // response is an angular object with a data variable which has the json
      // data from the server.  the json data from the server can have a 'data'
      // property.  if that data property has a 'payload' property, then we have
      // to trigger our payload handler
      if (response && response.data && response.data.data && response.data.data.payload) {
        $rootScope.$broadcast('PAYLOAD', response.data.data.payload, response.data.data.payload_key);
      }

      // this function is a promise callback in a chain, so we have to pass the
      // response along to be used elsewhere
      return response;
    }
  }]);

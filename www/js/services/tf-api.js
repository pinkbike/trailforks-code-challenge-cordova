angular.module('starter.services')
  .service('TFAPI', ['$rootScope', 'TFAPIPayloadHttp', 'UtilsJSON', '$q', 'PBEndpoints', 'TFErrorLogging', function($rootScope, TFAPIPayloadHttp, UtilsJSON, $q, PBEndpoints, TFErrorLogging) {
    var self = this;

    var COULD_NOT_REACH_SERVER_ERROR = self.COULD_NOT_REACH_SERVER_ERROR = 'Could Not Reach Server';
    var SERVER_ERROR                 = self.SERVER_ERROR                 = 'Server Error';
    var API_ERROR                    = self.API_ERROR                    = 'API Error';
    var DEFAULT_REQUEST_TIMEOUT      = 5000;
    var DEFAULT_CACHE_TIMEOUT        = 180;
    // convert to milliseconds
    DEFAULT_CACHE_TIMEOUT = DEFAULT_CACHE_TIMEOUT * 1000;

    self.publicAPI = function(action, method, data, options) {
      var promise, err, source, reason;
      if (options === undefined) {
        options = {};
      }
      options.cacheTimeout = options.cacheTimeout === undefined ? DEFAULT_CACHE_TIMEOUT : options.cacheTimeout;
      options.requestTimeout = options.requestTimeout === undefined ? DEFAULT_REQUEST_TIMEOUT : options.requestTimeout;

      console.log('API', 'TFAPI.publicAPI('+action+',...)', action, method, data, options);
      promise = doRequest();

      // finally, make sure we mark where we got the data from, and why
      return promise
        .then(function(data) {
          return {
            data: data,
            source: source,
            reason: reason,
          };
        });

      function doRequest() {
        var network_state = 'wifi'; //navigator.connection.type;
        var offline = ((network_state == 'none')) ? true : false;
        if (offline) {
          console.error('TFAPI/publicAPI', 'offline', navigator.connection.type);
          return $q.reject(new Error('Network Unavailable'));
        }
        else {
          var url = PBEndpoints.current().domain+'/api/1/'+action;

          var timestamp        = Math.round(Date.now()/1000);
          data['app_id']       = PBEndpoints.current().app_id;
          data['timestamp']    = timestamp;
          data['app_secret']   = PBEndpoints.current().app_secret;

          var request = {
            method: method,
            url: url,
            params: data,
            timeout: options.requestTimeout,
          };

          return TFAPIPayloadHttp(request)
            .then(function(response) {
              if (angular.isObject(response) && response.data.error) {
                return $q.reject(response);
              }
              else if (angular.isObject(response) && 'data' in response && angular.isObject(response.data) && 'data' in response.data) {
                source = 'network';
                return response.data.data;
              }
              else {
                return $q.reject(response);
              }
            })
            // more helpful error response
            .catch(function(errResponse) {
              var msg;

              var status = errResponse ? errResponse.status : null;
              if (status === null || status === 0) {
                msg = COULD_NOT_REACH_SERVER_ERROR;
              }
              else if (status >= 500 && status < 600) {
                msg = SERVER_ERROR;
              }
              // for any status reponse between 200 and 500 (so 2xx and 4xx responses),
              // look for an error message in the returned data
              else if (status >= 200 && status < 500) {
                if (angular.isObject(errResponse) && 'data' in errResponse && angular.isObject(errResponse.data) && 'message' in errResponse.data) {
                  msg = errResponse.data.message;
                } else if (angular.isObject(errResponse) && 'statusText' in errResponse && errResponse.statusText) {
                  msg = errResponse.statusText;
                } else if (angular.isObject(errResponse) && 'message' in errResponse && errResponse.message) {
                  msg = errResponse.message;
                } else {
                  msg = API_ERROR;
                }
              }

              var err = new Error(msg);
              err.status = status;
              err.msg = msg;
              err.code = (errResponse && errResponse.data && errResponse.data.data) ?  errResponse.data.data.code : null;

              if (status > 0) {
                TFErrorLogging.log('TFAPI/publicAPI', err, {request: request, code: err.code, response: errResponse});
              }
              return $q.reject(err);
            });
        }
      }
    };

  }]);

angular.module('starter.services')
  .service('PBEndpoints', [function() {
    var self = this;

    self.DEFAULTS = {
      domain:                        'https://www.trailforks.com',
      app_id:                        2,
      app_secret:                    'CiIb@mH!Gf4JzURC'
    };

    self.current = function() {
      return self.DEFAULTS;
    };

  }]);

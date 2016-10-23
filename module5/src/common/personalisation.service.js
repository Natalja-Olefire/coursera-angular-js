(function () {
"use strict";

angular.module('common')
.service('PersonalisationService', PersonalisationService);

PersonalisationService.$inject = ['$http', 'ApiPath'];
function PersonalisationService($http, ApiPath) {
  var service = this;

  service.getUserInfo = function () {
    if (!service.myInfo) {
      service.myInfo = {};
      service.myInfo.favorite=null;
    };
    return service.myInfo;
  };

  service.registerUser = function (newMyInfo) {
    service.myInfo = newMyInfo;
  };

}



})();

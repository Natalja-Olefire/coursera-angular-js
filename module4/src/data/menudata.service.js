(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    return $http.get(ApiBasePath + '/categories.json').then(function (response) {
      return response.data;
    });
    return response;
  };

  service.getItemsForCategory = function (category) {
    var config = {};
    config.params = {'category': category};
    return $http.get(ApiBasePath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}

})();

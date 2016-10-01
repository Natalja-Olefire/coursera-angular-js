(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var foundItems = this;

  foundItems.isEmpty = function () {
    return foundItems.items.length == 0;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;
  var started = false;
  var searchTerm;
  var found;

  narrowItDown.getMatchedMenuItems = function(searchTerm) {
    narrowItDown.started=true;
    if (searchTerm) {
      var promise=MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (response) {
        narrowItDown.found = response;
      })
      .catch(function(error) {
        console.log("Error retrieving data from the server");
        console.log(error);
      });
    } else {
      narrowItDown.found = [];
    }
  }

  narrowItDown.found = function() {
    return narrowItDown.found;
  }

  narrowItDown.removeThis = function(index) {
    narrowItDown.found.splice(index, 1);
  }

}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var filtered = [];
      for (var i=0; i<result.data.menu_items.length; i++) {
        if (result.data.menu_items[i].description.indexOf(searchTerm) >= 0) {
          filtered.push(result.data.menu_items[i]);
        }
      }
      return filtered;
    });
    return response;
    };
}

})();

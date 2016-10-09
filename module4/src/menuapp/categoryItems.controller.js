(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController', CategoryItemsController);

CategoryItemsController.$inject = ['menuitems'];
function CategoryItemsController(menuitems) {
  var itemsController = this;
  itemsController.menuitems = menuitems;
}

})();

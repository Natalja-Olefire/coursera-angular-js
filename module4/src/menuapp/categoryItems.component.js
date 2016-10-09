(function () {
'use strict';

angular.module('MenuApp')
.component('menuitems', {
  templateUrl: 'src/menuapp/templates/categoryItems.template.html',
  // controller: 'CategoryItemsController',
  bindings: {
    menuitems: '<'
  }
});

})();

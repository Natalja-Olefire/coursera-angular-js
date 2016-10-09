(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })
    .state('menu', {
      url: '/menu',
      templateUrl: 'src/menuapp/templates/menu.template.html',
      controller: 'MenuController as menu',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('menuitems', {
      url: '/menuitems/{category}',
      templateUrl: 'src/menuapp/templates/categoryItemsList.template.html',
      controller: "CategoryItemsController as category",
      resolve: {
        menuitems: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.category);
          }]
      }

  });

}

})();

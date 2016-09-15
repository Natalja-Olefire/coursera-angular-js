(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.menu = "";
  $scope.message = "Please enter data";
  $scope.colorClass = "red-box"

  $scope.checkMenu = function() {
    if (!$scope.menu) {
      $scope.message = "Please enter data first";
      $scope.colorClass = "red-box";
      return;
    }
    // arr = arr.filter(function(e){return e});
    var array = $scope.menu.split(',').filter(function(e){return e.trim()});
    if (array.length <= 3)
      $scope.message = "Enjoy!";
    else
      $scope.message = "Too much!";
    $scope.colorClass = "green-box";
  };

  $scope.sayMessage = function () {
    return $scope.message;
  };

}

})();

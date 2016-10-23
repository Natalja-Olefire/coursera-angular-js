(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['myInfo', 'PersonalisationService', 'MenuService'];
function SignupController(myInfo, PersonalisationService, MenuService) {
  var $ctrl = this;
  $ctrl.myInfo = myInfo;
  $ctrl.saved=false;
  $ctrl.menuItemFound=false;
  if (myInfo && myInfo.favorite) {
    $ctrl.menuItemLookedUp=myInfo.favorite.short_name;
  }

  $ctrl.signup = function() {
    PersonalisationService.registerUser($ctrl.myInfo);
    $ctrl.saved=true;
  };

  $ctrl.dirty = function() {
    $ctrl.saved=false;
  };

  $ctrl.lookupMenuItem = function() {
    $ctrl.saved=false;
    $ctrl.menuItemFound=false;

    if (!$ctrl.myInfo.favorite) { //nothin is entered, nothing to find, return
      return;
    }

    var short_name = $ctrl.myInfo.favorite.short_name;
    $ctrl.menuItemLookedUp = short_name; //previous item, that we tried to find
    if (short_name && short_name.length > 5) { //short name is longer than 2 symbols, don't go to server and reset it
      $ctrl.myInfo.favorite=null;
      return;
    }

    if (short_name && short_name.length >= 2) { // go to the server only if we have more than 2 symbols
      var promise = MenuService.getMenuItem(short_name.toUpperCase());
      promise
        .then(function (result) { // result found
            $ctrl.myInfo.favorite = result;
            $ctrl.menuItemFound=true;
        })
        .catch(function(response) { //nothing is found
          // $ctrl.myInfo.favorite=null;
          $ctrl.menuItemFound=false;
        });
    }; // if length >= 2
  };
}

})();

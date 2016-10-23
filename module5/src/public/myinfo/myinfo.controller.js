(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['myInfo'];
function MyinfoController(myInfo) {
  var $ctrl = this;
  $ctrl.myInfo = myInfo;
}

})();

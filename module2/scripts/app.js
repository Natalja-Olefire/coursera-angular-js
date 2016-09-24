(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListService', ShoppingListService);

ToBuyShoppingController.$inject = ['ShoppingListService'];
function ToBuyShoppingController(ShoppingListService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListService.getItemsToBuy();

  toBuyList.buyItem = function (itemIndex) {
    ShoppingListService.buyItem(itemIndex);
  }
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListService'];
function AlreadyBoughtShoppingController(ShoppingListService) {
  var boughtList = this;

  boughtList.items = ShoppingListService.getItemsBought();

  boughtList.returnItem = function (itemIndex) {
    ShoppingListService.returnItem(itemIndex);
  };
}


function ShoppingListService() {
  var service = this;

  var cookies = {name: "cookies", quantity: "100"};
  var milk = {name: "milk", quantity: "2"};
  var apples = {name: "apples", quantity: "10"};
  var oranges ={name: "oranges", quantity: "2"};
  var bananas = {name: "bananas", quantity: "8"};
  var icecream = {name: "ice cream", quantity: "10"};

  // List of shopping items to buy
  var itemsToBuy = [cookies, milk, apples, oranges, bananas, icecream];
  // list of already bought items
  var itemsBought = [];

  // moves item from "to buy" list to "already bought" list
  service.buyItem = function (itemIndex) {
    var item = itemsToBuy[itemIndex];
    //add item to "bought" array
    itemsBought.push(item);
    //remove item from "to buy" array
    itemsToBuy.splice(itemIndex, 1);
  };

  // moves item from "already bought" list to "to buy" list
  service.returnItem = function (itemIndex) {
    var item = itemsBought[itemIndex];
    //add item back to "items to buy" array
    itemsToBuy.push(item);
    //remove item from "bouht" array
    itemsBought.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

}


})();

angular.module("MainApp", ['ngRoute']);

angular.module("MainApp").config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});
angular.module("MainApp").controller("MainController", function ($scope) {


}).config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when('/', {
        templateUrl: '../partials/home.html',
        controller: 'HomeController'
    }).when('/Cart', {
        templateUrl: "../partials/cart.html",
        controller: 'CartController'
    }).when('/Billing', {
        templateUrl: '../partials/billing.html',
        controller: 'BillingController'
    }).when('/productAccess', {
        templateUrl: '../partials/productAccess.html',
        controller: 'ProductAccessController'
    });
});

angular.module("MainApp").controller('HomeController', function ($scope) {


});

angular.module("MainApp").controller('CartController', function ($scope) {
    $scope.price = 22;
    $scope.quantity = 10;
    $scope.subtotal = $scope.price * $scope.quantity;
});

angular.module("MainApp").controller('ProductAccessController', function ($scope, $http) {
    var productImage;
    document.getElementById("productImage").addEventListener("change", function () {
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            productImage = reader.result;
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    });
    $scope.submitProductData = function () {
        $http({
            url: '/product',
            method: 'POST',
            data: {
                "productId": $scope.productId,
                "productName": $scope.productName,
                "price": $scope.price,
                "description": $scope.description,
                "manufacturer": $scope.manufacturer,
                "productImage": productImage,
                "availableQuantity": $scope.availableQuantity
            }
        }).then(function () {
            alert("Success");
        }, function () {
            alert("Failure");
        });
    };

    $scope.getImage = function() {
        $http({
            url: '/product/1',
            method: 'GET'
        }).then(function () {
            alert("Success")
        }, function () {
            alert("Failure");
        });
    }
});
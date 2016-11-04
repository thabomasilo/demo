var myApp = angular.module('MyContacts', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'contacts.html',
            controller: 'AppCtrl'

        })
        .when('/about', {
            templateUrl: 'about.html',
            controller: 'aboutCtrl'
        })

    .when('/coachlab', {
            templateUrl: 'gallery.html',
            controller: 'coachlabCtrl'
        })
        .otherwise({ redirectTo: '/' });
});

myApp.controller('AppCtrl', function($scope, $http) {
    //$http is a provider
    console.log("hello world from controller");

    //encapsulation
    var refresh = function() {
        //the /contactlist is the route that we create to request stuff from the browser
        $http.get('/contacts').success(function(response) {
            console.log("I got the data i requested");
            //this now allows us to use the variable contactList in our view/html
            $scope.contacts = response;

            //clearing the textboxes
            $scope.contact = "";
        });
    };

    refresh();
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contacts', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contacts/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contacts/' + id).success(function(response) {
            $scope.contact = response;
        });
    };

    $scope.update = function() {
        //outputing the id of the contact in the input boxes bound to the contact scope
        console.log($scope.contact._id);
        $http.put('/contacts/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh();
        });
    };

    $scope.clear = function() {
        $scope.contact = "";
    };

});

myApp.controller('aboutCtrl', function($scope, $http) {
    var getInfo = function() {
        //the /contactlist is the route that we create to request stuff from the browser
        $http.get('/aboutus').success(function(response) {
            console.log("I got the data i requested");
            $scope.aboutus = response;
        });
    };
    getInfo();
});
myApp.controller('coachlabCtrl', ['$scope', '$log', function($scope, $log) {

}]);
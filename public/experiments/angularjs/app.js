/**
 * Created by NishantRatnakar on 2/21/2016.
 */


var app = angular.module("HelloWorldApp", []);

app.controller("HelloWorldController", TheController);

function TheController($scope){

    $scope.hello = "Hello!!! from Angular";
}

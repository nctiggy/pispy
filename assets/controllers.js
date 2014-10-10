/* Angular.js controller for PiSpy */

var app = angular.module('PiSpyApp', []);

app.controller('TempController', function($scope, $http) {
  $http.get('/api/temp').
    success(function(data, status, headers, config) {
      $scope.temps = data.currenttemp;
    }).
    error(function(data, status, headers, config) {
      alert("FATAL: could not get contact API" + status);
    });
});

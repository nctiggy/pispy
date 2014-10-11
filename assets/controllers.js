/* Angular.js controller for PiSpy */

var app = angular.module('PiSpyApp', []);

app.controller('TempController', function TempController($scope, $http) {
  $http.get('/api/temp').
    success(function(data, status, headers, config) {
      $scope.temps = data.currenttemp;
    }).
    error(function(data, status, headers, config) {
      alert("FATAL: could not get contact API " + status);
    });
});
app.controller('EagleTempController', function EagleTempController($scope, $http) {
  $http.get('http://api.openweathermap.org/data/2.5/weather?id=5591778&units=imperial').
    success(function(data, status, headers, config) {
      $scope.eagletemp = data.main;
    }).
    error(function(data, status, headers, config) {
      alert("FATAL: could not get contact API " + status);
    });
});

/* Angular.js controller for PiSpy */

var app = angular.module('PiSpyApp', []);

app.controller('InternalTempController', function InternalTempController($scope, $http) {
  $http.get('/api/temp').
    success(function(data, status, headers, config) {
      $scope.internaltemp = data.currenttemp;
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
app.controller('MilwaukeeTempController', function MilwaukeeTempController($scope, $http) {
  $http.get('http://api.openweathermap.org/data/2.5/weather?id=5263045&units=imperial').
    success(function(data, status, headers, config) {
      $scope.milwaukeetemp = data.main;
    }).
    error(function(data, status, headers, config) {
      alert("FATAL: could not get contact API " + status);
    });
});
app.controller('SeattleTempController', function SeattleTempController($scope, $http) {
  $http.get('http://api.openweathermap.org/data/2.5/weather?id=5809844&units=imperial').
    success(function(data, status, headers, config) {
      $scope.seattletemp = data.main;
    }).
    error(function(data, status, headers, config) {
      alert("FATAL: could not get contact API " + status);
    });
});

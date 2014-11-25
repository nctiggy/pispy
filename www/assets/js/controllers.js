/* Angular.js controller for PiSpy */
var app = angular.module('PiSpyApp', []);

/*					*/
/* Code for Tempeture functions		*/
/*					*/
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
/*					*/
/* Code for Archive functions		*/
/*					*/
app.controller('ArchiveController', function ($scope, FileMgmt, alertService) {
  $scope.listFiles = function() {
  	FileMgmt.lsFiles.success(function(data){
  		$scope.archive = data;
		}).
		error(function(data,status){
      alert("FATAL: could not get contact API " + status);
		})
	};
  $scope.deleteFile = function(fileName, indexNum) {
		FileMgmt.rmFile(fileName).success(function(data) {
  		$scope.archive.contents.splice(indexNum,1)
		}).
		error(function(){
			alert("FATAL: could not get contact API " + status);
		})
	};
});

app.factory("FileMgmt", function($http) {
	return {
		rmFile: function(fileName){
			return $http.post('/api/archive/rm/' + fileName)
		}
		lsFiles: fucntion(){
			return $http.get('/api/archive/ls')
		}
	}
});

app.factory('alertService', fucntion($rootScope) {
	var alertService = {};

	$rootScope.alerts = [];

	alertService.add = function(type, msg) {
		$rootScope.alerts.push({'type': type, 'msg': msg});
	};

	alertService.closeAlert = function(index) {
		$rootScope.alerts.splice(index,1);
	};

	return alertService;
});

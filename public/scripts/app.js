(function(){
	var soundCtl = angular.module('soundCtl', ['rzModule']);

	soundCtl.controller('webPlayerController', ['$scope','streamOutput', function($scope, streamOutput){
		$scope.player = {
			isPlaying: false
		};
	}]);

	soundCtl.directive('audioPlayer', function(){
		return {
			restrict: 'E',
			templateUrl: "/templates/music-player",
			controller: function($scope, $element, streamOutput, $sce){
				
				$scope.volumeSlider = 150;

				streamOutput.getOutputURL().then(function(res){
					$scope.outputUrl = $sce.trustAsResourceUrl(findAACUrl(res));
				});

				function findAACUrl(urls) {
					for (var i = 0; i < urls.length; i++) {
						if (urls[i].substring(urls[i].length - 4) === ".aac") {
							return urls[i];
						} 
					}
					return urls[0];
				}


				$scope.toggleStream = function(){
					console.log("toggleStream: ", $scope.player.isPlaying);
					var audioTag = $element.find("audio")[0];
					if ($scope.player.isPlaying) {
						audioTag.pause();
					} else {
						audioTag.play();
					}
					$scope.player.isPlaying = !$scope.player.isPlaying;
				};
			}
		}
	});

	soundCtl.directive('vertical-slider', function(){
		return {
			
		}
	});

	// A factory service that goes to all the studio paths and returns an Array of stream URLS with
	soundCtl.factory("streamOutput", ['$http','$q', function($http, $q){
		
		var streamOutput = {};

		streamOutput.getOutputURL = function(){
			var mountPoints = [];

			// API call  and get studio paths
			return $http.get('http://kradradio:5000/studio').then(function(studioPaths){
				var promises = [];
				
				// change it to forEach
				for(var i = 0; i < studioPaths.data.length; i++) {
					console.log('Requesting path ' + studioPaths.data[i]);
					promises.push($http.get('http://kradradio:5000'+studioPaths.data[i]).success(searchForOutput));
				}
				
				return $q.all(promises).then(function(){
					// return mountPoints;
					return generateStreamUrls(mountPoints);
				})
			});
			
			function generateStreamUrls(mountPoints){
				var urls = [];
				for (var i = 0; i < mountPoints.length; i++) {
					urls.push("http://kradradio:5000/" + mountPoints[i]);
				}
				return urls;
			}

			function searchForOutput(studioPath) {
				console.log('searching for output..');
				if (studioPath['output'] !== undefined ) {
					if (studioPath['output']['transmission'] !== undefined) {
						console.log("output found:", studioPath['output']['transmission']['mount']);
						mountPoints.push(studioPath['output']['transmission']['mount']);
					};
				};
			}
		}
		
		return streamOutput;
	}]);

// Refactor with this
// http://stackoverflow.com/questions/32212135/how-to-return-multiple-http-request-that-depend-on-each-other-in-angular
// https://thinkster.io/a-better-way-to-learn-angularjs/promises
// http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/

})();
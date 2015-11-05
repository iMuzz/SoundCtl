(function(){
	var soundCtl = angular.module('soundCtl', []);

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

				$scope.outputUrls = [];
				streamOutput.getOutputURL().then(function(res){
					console.log('Answers:', res);
					$scope.outputUrls = trustResources(res);
				});

				function trustResources(urls){
					var trustedUrls = []

					for(var i = 0; i < urls.length; i++) {
						trustedUrls.push($sce.trustAsResourceUrl(urls[i]));
					}
					return trustedUrls;
				}


				$scope.toggleStream = function(){
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

	soundCtl.factory("streamOutput", ['$http','$q', function($http, $q){
		
		var streamOutput = {};

		streamOutput.getOutputURL = function(){
			var mountPoints = [];

			// API call  and get studio paths
			var promise = $http.get('http://kradradio:5000/studio').then(function(res){
				var promises = [];
				
				// change it to forEach
				for(var i = 0; i < res.data.length; i++) {
					console.log('Requesting path ' + i);
					promises.push($http.get('http://kradradio:5000'+res.data[i]).success(searchForOutput));
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

			return promise;
		}

		
		return streamOutput;
	}]);


})();
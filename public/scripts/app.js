(function(){
	var soundCtl = angular.module('soundCtl', []);

	soundCtl.controller('webPlayerController', ['$scope', function($scope){
		$scope.player = {
			isPlaying: false
		};
	}]);

	soundCtl.directive('audioPlayer', function(){
		return {
			restrict: 'E',
			templateUrl: "/templates/music-player",
			controller: function($scope, $element){
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
})();
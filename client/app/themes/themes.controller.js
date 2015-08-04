
	angular.module('codeditorApp')
		.controller('ThemeCtrl', ThemeCtrl)

		ThemeCtrl.$inject = ['$scope', '$rootScope'];

		function ThemeCtrl($scope, $rootScope){
			$scope.themes = ['3024-day', '3024-night', 'ambiance', 'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'colorforth', 
							'dracula', 'eclipse', 'elegant', 'erlang-dark', 'icecoder', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 
							'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'rubyblue', 'seti', 
							'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 
							'yeti', 'zenburn'
						];

			$scope.$watch('$viewContentLoaded', function(){
				$rootScope.$broadcast('getThemes', {
					message: $scope.themes
				});
			});
		};
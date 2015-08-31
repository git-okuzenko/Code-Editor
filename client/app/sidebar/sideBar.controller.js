
	angular.module('fileEditorApp')
		.controller('sideBarCtrl', sideBarCtrl)

		sideBarCtrl.$inject = ['$scope', '$http', '$rootScope', 'baseUrl', 'getterService'];

		function sideBarCtrl($scope, $http, $rootScope, baseUrl, getterService, filterList){

			$scope.cities = [];

			$scope.traverse = function(cities){
				var i, len = cities.length;
				for(i = 0; i < len; i++){
					if(cities[i].children.length > 0){
						$scope.traverse(cities[i].children);
					}
					$scope.cities.push(cities[i].name);
				}
			}

			$scope.processTreeData = function(data){
				$scope.traverse(data.script);
			}

			$scope.init = function(){
				getterService.getTreeData(baseUrl + 'datatree', $scope.processTreeData);
			};
			
			$scope.init();

			$scope.sendData = function(data){
				$rootScope.$broadcast('getCode', {
					id: data._id,
					rev: data._rev,
					script: data.script
				});
			}

			$scope.getterFile = function(url){
				getterService.getFile(baseUrl + url, $scope.sendData);
			}

			$scope.getFile = function($event){
				if($event.target.getAttribute('data-city')){
					var url = $event.target.getAttribute('data-city').toLowerCase().split(' ').join('_');

					$scope.getterFile(url);
				}
			};
		};
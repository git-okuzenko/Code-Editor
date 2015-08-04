
	angular.module('codeditorApp')
		.controller('SideBarCtrl', SideBarCtrl)

		SideBarCtrl.$inject = ['$scope', '$http', '$rootScope', 'baseUrl', 'getterService'];

		function SideBarCtrl($scope, $http, $rootScope, baseUrl, getterService, filterList){

			$scope.cities = [];

			getterService.getTreeData(baseUrl + 'datatree', function(data){
				$scope.traverse = function(cities){
					var i, len = cities.length;
					for(i = 0; i < len; i++){
						if(cities[i].children.length > 0){
							$scope.traverse(cities[i].children);
						}
						$scope.cities.push(cities[i].name);
					}
				}
				$scope.traverse(data.script);
			});

			$scope.getFile = function(event){
				if(event.target.getAttribute('data-city')){
					var url = event.target.getAttribute('data-city').toLowerCase().split(' ').join('_');

					getterService.getFile(baseUrl + url, function(data){
						$rootScope.$broadcast('getCode', {
							id: data._id,
							rev: data._rev,
							script: data.script
						});
					});
				}
			};
		};
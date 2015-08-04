
	angular.module('codeditorApp')
		.controller('SidebarCtrl', SidebarCtrl)

		SidebarCtrl.$inject = ['$scope', '$http', '$rootScope', 'baseUrl', '$resource'];

		function SidebarCtrl($scope, $http, $rootScope, baseUrl, $resource){

			$scope.getTreeData = $resource(baseUrl + 'treedata', null);

			$scope.getTreeData.get().$promise.then(function(data){
				$scope.treeData = data.script;
			});
		
			$scope.getNeedFile = function(event){
				if(event.target.tagName === 'SPAN'){
					var url = event.target.innerHTML.toLowerCase().split(' ').join('_');
					$scope.getCodeRequest = $resource(baseUrl + url, null);

					$scope.getCodeRequest.get().$promise.then(function(data){
						$rootScope.$broadcast('getCode', {
							id: data._id,
							rev: data._rev,
							script: data.script
						});
					});

					// $http.get(baseUrl + url)
					// 	.success(function(data){
					// 		console.log(data._id);
					// 		$rootScope.$broadcast('getCode', {
					// 			id: data._id,
					// 			rev: data._rev,
					// 			script: data.script
					// 		});
					// 	})
				}
			};
		};

	angular.module('codeditorApp')
		.controller('CodeMirrorCtrl', CodeMirrorCtrl)

		CodeMirrorCtrl.$inject = ['$scope', '$http', 'baseUrl', '$resource'];

		function CodeMirrorCtrl($scope, $http, baseUrl, $resource){

			$scope.selected = 'mbo';
			
			$scope.$on('getThemes', function(event, data){
				$scope.themes = data.message;
			});

			$scope.selectTheme = function(){
				var input = angular.element(document.querySelector('#select'))[0],
					theme = input.options[input.selectedIndex].textContent;
					$scope.editor.setOption("theme", theme);
		  	};

		  	$scope.runCode = function(){
				var value = $scope.editor.getValue(),
					runCode = angular.element(document.querySelector('#runCode'));
					runCode.attr('href', "javascript:" + value);
					angular.element(document.querySelector('.enteredCode')).html(value);
			}

			$scope.$on('getCode', function(event, data){
				$scope.editor.setValue(data.script);
				$scope.postId = data.id;
				$scope.postRev = data.rev;
			});

			$scope.saveCode = function(){
				$scope.saveCodeRequest = $resource(baseUrl + $scope.postId, null, {
					update: {method: 'PUT'}
				});

				$scope.saveCodeRequest.update({
					"_id": $scope.postId,
					"_rev": $scope.postRev,
					"script": $scope.editor.getValue()
				});
				

				


				// $http({
				// 	method: "PUT",
				// 	url: baseUrl + $scope.postId,
				// 	data: {
				// 		"_id": $scope.postId,
				// 		"_rev": $scope.postRev,
				// 		"script": $scope.editor.getValue()
				// 	}
				// })
			}		
		};

	angular.module('codeditorApp')
		.controller('CodeMirrorCtrl', CodeMirrorCtrl)

		CodeMirrorCtrl.$inject = ['$scope', '$http', 'baseUrl'];

		function CodeMirrorCtrl($scope, $http, baseUrl){

			$scope.selected = 'mbo';
			$scope.themes = ['3024-day', '3024-night', 'ambiance', 'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'colorforth', 
							'dracula', 'eclipse', 'elegant', 'erlang-dark', 'icecoder', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 
							'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'rubyblue', 'seti', 
							'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 
							'yeti', 'zenburn'
						];

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
				$http.get(baseUrl + $scope.postId).success(function(data){
					$http({
						method: "PUT",
						url: baseUrl + $scope.postId,
						data: {
							"_id": data._id,
							"_rev": data._rev,
							"script": $scope.editor.getValue()
						}
					});
				});
			}

			$scope.checkCode = function() {
				var success = JSHINT($scope.editor.getValue()),
					output = '';
				if (!success){
					output = "Check format error:\n\n";
					for (var i in JSHINT.errors){
						var err = JSHINT.errors[i];
						if (null != err) {
							output += err.line + '[' + err.character + ']: ' + err.reason + '\n';
						}
						else {
							output += "Check format unknown error:\n";
						}
					}
					alert(output);
				}
				else{
					$scope.saveCode();
					return success;
				}
			}
		};
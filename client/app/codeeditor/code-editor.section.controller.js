
	angular.module('fileEditorApp')
		.controller('codeEditorCtrl', codeEditorCtrl)

		codeEditorCtrl.$inject = ['$scope', '$http', 'baseUrl', '$controller', '$cookies'];

		function codeEditorCtrl($scope, $http, baseUrl, $controller, $cookies){

			$scope.editorThemeOption = 'theme';
			$scope.selected = $cookies.get('selectedTheme') || 'mbo';
			$scope.themes = ['3024-day', '3024-night', 'ambiance', 'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'colorforth', 
							'dracula', 'eclipse', 'elegant', 'erlang-dark', 'icecoder', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 
							'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'rubyblue', 'seti', 
							'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 
							'yeti', 'zenburn'
						];

			$scope.setLifeTime = function(){
				var lifeCircle = new Date();
					lifeCircle.setFullYear(lifeCircle.getFullYear() + 1);
				$cookies.put('selectedTheme', $scope.selected, {
					'expires': lifeCircle
				});
			}

			$scope.selectTheme = function() {
				$scope.setLifeTime();
				$scope.editor.setOption($scope.editorThemeOption, $scope.selected);
			};

			$scope.enteredCode = document.querySelector('.enteredCode');

			$scope.runCode = function($event) {
				var value = $scope.editor.getValue(),
					runCodeButton = $event.target;
				runCodeButton.setAttribute('href', "javascript:" + value);
				$scope.enteredCode.innerHTML = value;
			}

			$scope.$on('getCode', function(event, data){
				$scope.editor.setValue(data.script);
				$scope.postId = data.id;
				$scope.postRev = data.rev;
			});	

			$scope.putRequest = function(data){
				$http({
					method: "PUT",
					url: baseUrl + $scope.postId,
					data: {
						"_id": data._id,
						"_rev": data._rev,
						"script": $scope.editor.getValue()
					}
				});
			}

			$scope.saveCode = function(){
				$http.get(baseUrl + $scope.postId).success($scope.putRequest);
			}

			$scope.checkCode = function(){
				var success = JSHINT($scope.editor.getValue());
				if(success){
					$scope.saveCode();
					return success;
				}
				else{
					$scope.errors();
				}
			}

			$scope.errors = function(){
				var output = "Check format error:\n\n";
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


			$scope.widgets = [];
			$scope.waiting;

			$scope.removeLine = function(){
				var i, len = $scope.widgets.length;
				for(i = 0; i < len; ++i){
					$scope.editor.removeLineWidget($scope.widgets[i]);
				}
				len = 0;
			};

			$scope.errorCheck = function(){
				for(i = 0; i < JSHINT.errors.length; ++i){
					var err = JSHINT.errors[i];
					if (!err){
						continue;
					}
					else{
						var errLine = angular.element('<div>').addClass('lint-error').text(err.reason),
							errIcon = angular.element('<span>').addClass('lint-error-icon').text('!!');
							errLine.prepend(errIcon);
						$scope.widgets.push($scope.editor.addLineWidget(err.line - 1, errLine[0], {coverGutter: false, noHScroll: true}));
					}
				}
			};

			$scope.errorLine = function(){
				var info = $scope.editor.getScrollInfo(),
					after = $scope.editor.charCoords({line: $scope.editor.getCursor().line + 1, ch: 0}, "local").top;
				if(info.top + info.clientHeight < after){
					$scope.editor.scrollTo(null, after - info.clientHeight + 3);
				}
			};

			$scope.updateHints = function(){
				$scope.editor.operation(function(){
					$scope.removeLine();
					JSHINT($scope.editor.getValue());
					$scope.errorCheck();
				});
				$scope.errorLine();
			};
		};		
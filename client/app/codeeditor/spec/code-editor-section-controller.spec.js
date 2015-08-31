describe('codeEditorCtrl', function(){
	
	var $rootScope, $scope, controller, getterServiceMock;

		beforeEach(function(){
			module('fileEditorApp');


			inject(function($injector){
				$rootScope = $injector.get('$rootScope');
				$scope = $rootScope.$new();
				controller = $injector.get('$controller')("codeEditorCtrl", {
					$scope: $scope
				});
			});
		});

		it('themes should be defined', function(){
			expect($scope.themes).toBeDefined();
			expect($scope.themes.length).toBeGreaterThan(0);
		});

		it('should set life cookies time', inject(function($cookies){  	
		  	var cookiesMock = {
				put: function(){},
				get: function(){}
			}
		
			spyOn(cookiesMock, 'put');

			inject(function($injector){
				controller = $injector.get('$controller')("codeEditorCtrl", {
					$scope: $scope,
					$cookies: cookiesMock
				});
			});

			$scope.setLifeTime();
			expect(cookiesMock.put).toHaveBeenCalled();
		}));

		it('theme should be selected', function() {
			$scope.setLifeTime = function(){};
			$scope.editor = {
				setOption: function() {}
			};

			spyOn($scope.editor, 'setOption');
			spyOn($scope, 'setLifeTime');

			var selectedValue = 'themeStyle';
				$scope.selected = selectedValue;
				$scope.selectTheme();
			
			expect($scope.editor.setOption).toHaveBeenCalledWith($scope.editorThemeOption, selectedValue);
			expect($scope.setLifeTime).toHaveBeenCalled();
		});

		it('entered code element should exist', function(){
			expect($scope.enteredCode).toBeDefined();
		});

		it('code should be running', function() {
			var value = 'test';
			$scope.editor = {
				getValue: function() {
					return value;
				}
			};

			var runButton = {
				hrefAttr: null,
				setAttribute: function(arg1, arg2) {
					if (arg1 === 'href') {
						this.hrefAttr = arg2;
					}
				}
			};

			var event = {
				target: runButton
			};

			$scope.enteredCode = {
				innerHtml: null
			};

			$scope.runCode(event);

			expect($scope.enteredCode.innerHTML).toBe(value);
			expect(runButton.hrefAttr).toBe('javascript:'+value);
		});

		it('putRequest test', function(){
			var value = 'item value';
			var baseUrl = 'url';
			$scope.postId = 'id';
			var data = {
				_id: 'identificator',
				_rev: 'revision',
				script: value
			}
			var requestObject = {
				method: 'PUT',
				url: baseUrl + $scope.postId,
				data: data
			}
			var httpMock = {
				mockFunc: function(requestObject){}
			};
			$scope.editor = {
				getValue: function(){}
			};
			spyOn($scope.editor, 'getValue').and.returnValue(value);
			spyOn(httpMock, 'mockFunc');
			inject(function($injector){
				controller = $injector.get('$controller')("codeEditorCtrl", {
					$scope: $scope,
					$http: httpMock.mockFunc,
					baseUrl: baseUrl
				});
			});
				
			$scope.putRequest(data);

			expect($scope.editor.getValue).toHaveBeenCalled();
			expect(httpMock.mockFunc).toHaveBeenCalledWith(requestObject);
		});

		it('saveCode test', function() {
			var data = 'data';
			var successObject = {
				success: function(f){
					f(data);
				}
			};
			var httpMock = {
				get: function(url){
					return successObject;
				}
			};
			spyOn(httpMock, 'get').and.callThrough();
			var baseUrl = 'url';
			inject(function($injector){
				controller = $injector.get('$controller')("codeEditorCtrl", {
					$scope: $scope,
					$http: httpMock,
					baseUrl: baseUrl
				});
			});

			$scope.putRequest = function() {};
			var one = spyOn($scope, 'putRequest');
			var postId = 'postId'
			$scope.postId = postId;
			$scope.saveCode();

			expect(httpMock.get).toHaveBeenCalledWith(baseUrl + postId);
			expect($scope.putRequest).toHaveBeenCalledWith(data);
		});

		it('checkCode test', function(){
			var value = 'test value';
			$scope.editor = {
				getValue: function(){}
			}

			spyOn($scope.editor, 'getValue').and.returnValue(value)
			
			$scope.errors = function(){};

			spyOn($scope, 'errors');

			$scope.checkCode();

			expect($scope.editor.getValue).toHaveBeenCalled();
			expect($scope.errors).toHaveBeenCalled();
		});

		it('errores should be check', function(){
			var output = 'Check format error:'
			var alert = function(output){
				return output
			}
			var jshint = {
				errors: {
					line: 10,
					character: 'one',
					reason: 'mistake'
				}
			}

			$scope.errors();

			expect(output).not.toBe(false);
			expect(jshint.errors).toBeDefined();
		});
	
		it('widgets and waitings should be exist', function() {
			expect($scope.widgets).toBeDefined();
			expect($scope.waitings).toBeUndefined();
		});


		it('should remove line', function() {
			var i = 0;
			var len = 3;
			$scope.widgets = {
				length: len
			}
			$scope.editor = {
				removeLineWidget: function(){}
			}
			$scope.$apply(function(){
				len = 0;
			})
			
			spyOn($scope.editor, 'removeLineWidget');

			$scope.removeLine();

			expect($scope.editor.removeLineWidget).toHaveBeenCalled();
			expect(len).toBe(0);
		});

		it('errors should be checked...', function(){
			var returnValue = 'Hello World';
			$scope.editor = {
				addLineWidget: function(){}
			}

			spyOn($scope.editor, 'addLineWidget').and.returnValue(returnValue)
			spyOn($scope.widgets, 'push')

			$scope.errorCheck();

			expect($scope.editor.addLineWidget).toHaveBeenCalled();
			expect($scope.widgets.push).toHaveBeenCalledWith(returnValue);
		});

		it('should observe for errors lines', function() {
			var info = {
				top: 5,
				clientHeight: 10
			};
			var after = {
				top: 20
			};
			var lineObject = {
				line: 4,
				ch: 0
			};
			$scope.editor = {
				getScrollInfo: function(){},
				charCoords: function(){},
				getCursor: function(){},
				scrollTo: function(){}
			}

			spyOn($scope.editor, 'getScrollInfo').and.returnValue(info);
			spyOn($scope.editor, 'charCoords').and.returnValue(after);
			spyOn($scope.editor, 'getCursor').and.returnValue(lineObject);
			spyOn($scope.editor, 'scrollTo');
			
			$scope.errorLine();

			expect($scope.editor.getScrollInfo).toHaveBeenCalled();
			expect($scope.editor.getCursor).toHaveBeenCalled();
			expect($scope.editor.charCoords).toHaveBeenCalled();
			expect($scope.editor.scrollTo).toHaveBeenCalledWith(null, after.top - info.clientHeight + 3);

		});

		it('updateHints should work correct', function() {
			$scope.editor = {
				getScrollInfo: function(){
					return {
						top: 5,
						clientHeight: 10
					}
				},
				charCoords: function(){
					return  {
						top: 20
					}
				},
				getCursor: function(){
					return {
						line: 4,
						ch: 0
					}
				},
				scrollTo: function(){},
				operation: function(){}
			}

			$scope.errorLine = function(){}

			spyOn($scope.editor, 'operation');

			spyOn($scope, 'errorLine')

			$scope.updateHints();

			expect($scope.editor.operation).toHaveBeenCalled();
			expect($scope.errorLine).toHaveBeenCalled();

		});
});
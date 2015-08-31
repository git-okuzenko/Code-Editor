	describe('codeEditor testing', function(){
		var body = angular.element(document).find('body'),
			codeEditorSection, codeditor, compileTemplate, httpMock, baseUrlMock, successObject, data,
			codeditorHtml = '<textarea  placeholder="Code goes here..." code-editor="javascript"></textarea>';

		beforeEach(function(){
			module('fileEditorApp')
			module('codeeditor/code-editor-section.html')
		})

		beforeEach(function(){
			data = 'data';
			successObject = {
				success: function(f){
					f(data);
				}
			};
			httpMock = {
				get: function(url){
					return successObject;
				}
			};
			baseUrlMock = 'url';
		})

		beforeEach(inject(function($rootScope, $controller, $compile, $templateCache){
			$scope = $rootScope.$new();
			$controller = $controller("codeEditorCtrl", {
				$scope: $scope,
				$http: httpMock,
				baseUrl: baseUrlMock
			});
			codeditor = $compile(angular.element(codeditorHtml))($scope);
			compileTemplate = $compile($templateCache.get('codeeditor/code-editor-section.html'))($scope);

			body.append(compileTemplate);
		}))

		it('it should exist', function(){
			expect(codeditor.attr('code-editor')).toEqual('javascript');
			expect(codeditor[0].nextSibling.getAttribute('class', 'CodeMirror')).toBeDefined();
		});

		it('it should exist', function(){
			expect(compileTemplate.find('p')[0].innerText).toEqual('Press ctrl+space to activate autocompletion.')
			expect(compileTemplate.find('a')[0].innerText).toEqual('Save Code')
			expect(compileTemplate.find('textarea')[0]).toBeDefined()
		});

		it('should not has empty href attribute', function(){
			var value = 'console.log(10)';
			$scope.editor = {
				getValue: function(){
					return value;
				}
			}
			expect(compileTemplate.find('a')[1].getAttribute('href')).toBeFalsy();
			
			compileTemplate.find('a').triggerHandler("click");
			
			expect(compileTemplate.find('a')[1].getAttribute('href')).toBe('javascript:' + value);
			expect($scope.enteredCode.innerHTML).toBe(value);
		});

		it('should save code on database', function(){
			spyOn(httpMock, 'get').and.callThrough();

			$scope.putRequest = function(){};
			spyOn($scope, 'putRequest');
			$scope.postId = 'postId';

			compileTemplate.find('a').triggerHandler("click");

			expect(httpMock.get).toHaveBeenCalledWith(baseUrlMock + $scope.postId);
			expect($scope.putRequest).toHaveBeenCalledWith(data);
		});

		it('should has default some style', function(){
			expect(codeditor[0].nextSibling.getAttribute('class')).toContain($scope.selected);
		});
	})
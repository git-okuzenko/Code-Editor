	
	describe('sibeBar', function(){
		var $rootScope, $scope, $compile,
			body = angular.element(document).find('body');

		beforeEach(module('fileEditorApp'))
		beforeEach(module('sidebar/sidebar.html'))

		beforeEach(inject(function($rootScope, $controller, $compile, $templateCache){
			$scope = $rootScope.$new();
			$scope.cities = ['London', 'Sweden', 'Ukraine'];
			sideBarMock = $compile($templateCache.get('sidebar/sidebar.html'))($scope);
			body.append(sideBarMock);
			$rootScope.$digest();
		}))

		it('it should exist too', function(){
			expect(sideBarMock.find('form').children().children().length).toEqual(2);
			expect(sideBarMock.find('h3').text()).toEqual('Your files list');
			expect(sideBarMock.find('nav').find('ul')[0].children.length).toEqual($scope.cities.length);
		});
	});
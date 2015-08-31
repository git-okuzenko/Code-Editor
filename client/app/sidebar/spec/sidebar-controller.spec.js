
describe('SideBarController', function(){
	
	var $rootScope,
		$scope,
		controller;

		beforeEach(function(){
			module('fileEditorApp');

			inject(function($injector){
				$rootScope = $injector.get('$rootScope');
				$scope = $rootScope.$new();
				controller = $injector.get('$controller')("sideBarCtrl", {
					$scope: $scope
				});
			});
		});


	it('checkCitiesExist', function(){
		expect($scope.cities).toBeDefined();
	});

	it('processTreeData test', function(){
		var data = {
			script: 'script'
		}

		$scope.traverse = function(){}

		spyOn($scope, 'traverse');

		$scope.processTreeData(data);

		expect($scope.traverse).toHaveBeenCalledWith(data.script);
	});

	it('init test', function(){
		var baseUrli = 'baseUrl';
		var url = 'datatree';
		$scope.processTreeData = function(data){
			return 'some func'
		};
		var callback = $scope.processTreeData;
		var getterServiceMock = {
			getTreeData: function(url, callback){
				callback(data);
			}
		};

		spyOn(getterServiceMock, 'getTreeData');
		inject(function($injector){
			controller = $injector.get('$controller')("sideBarCtrl", {
				$scope: $scope,
				baseUrl: baseUrli,
				getterService: getterServiceMock
			});
		});

		$scope.init();

		expect(getterServiceMock.getTreeData).toHaveBeenCalledWith(baseUrli + url, $scope.processTreeData);
	});

	it('data should be sent to another controller', function(){
		var funcName = "getCode";
		var data = {
			_id: 'idIdid',
			_rev: 'revRevrev',
			script: 'console'
		}
		var object = {
			id: data._id,
			rev: data._rev,
			script: data.script
		}
		var rootScope = {
			$broadcast: function(funcName, dataScri){
				return data;
			}
		}
		inject(function($injector){
			controller = $injector.get('$controller')("sideBarCtrl", {
				$scope: $scope,
				$rootScope: rootScope
			});
		});

		spyOn(rootScope, '$broadcast');

		$scope.sendData(data);

		expect(rootScope.$broadcast).toHaveBeenCalledWith(funcName, object);
	})

	it('getterFile need work', function(){
		var baseUrli = 'baseUrl';
		var url = 'url';
		$scope.sendData = function(data){
			return 'some func'
		};
		var callback = $scope.sendData;
		var getterServiceMock = {
			getFile: function(url, callback){
				callback(data);
			},
			getTreeData: function(){}
		};

		spyOn(getterServiceMock, 'getFile');
		inject(function($injector){
			controller = $injector.get('$controller')("sideBarCtrl", {
				$scope: $scope,
				baseUrl: baseUrli,
				getterService: getterServiceMock
			});
		});

		$scope.getterFile(url);

		expect(getterServiceMock.getFile).toHaveBeenCalledWith(baseUrli + url, $scope.sendData);
	});

	it('getFile should work', function(){
		var url = 'url';
		var attr = 'data-city';
		var event = {
			target: {
				getAttribute: function(attr){}
			}
		}

		$scope.getterFile = function(url){};

		spyOn(event.target, 'getAttribute').and.returnValue(url)
		spyOn($scope, 'getterFile');

		$scope.getFile(event);

		expect(event.target.getAttribute).toHaveBeenCalledWith(attr);
		expect($scope.getterFile).toHaveBeenCalledWith(url);
	});

});
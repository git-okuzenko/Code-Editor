describe('Main module testing', function(){
	var url, getterService, getterServiceMock, httpMock;

		beforeEach(module('fileEditorApp'));
		beforeEach(function(){
			getterServiceMock = {
				getTreeData: function(url, callback){
					httpMock.get(url);
				},
				getFile: function(url, callback){
					httpMock.get(url);
				}
			}
			httpMock = {
				get: function(url){
					return {
						success: function(callback){
							callback('This has finnished');
						}
					}
				}
			}
		})

		beforeEach(inject(function(getterService, _$http_){
			getterService = getterServiceMock;
			$http = httpMock;
		}))

		it('should behave...', inject(function(baseUrl){
			expect(baseUrl).toEqual('http://localhost:5984/codeditor/');
		}));


		it('should behave...', function() {
			var callback = function(data){
				return data;
			};
			var data = {things: 'and stuff'},
				url = 'urllru';
			spyOn(httpMock, 'get');
			
			getterServiceMock.getTreeData(url, callback);

			expect(httpMock.get).toHaveBeenCalledWith(url);
		});

		it('should behave...', function() {
			var callback = function(data){
				return data;
			};
			var data = {things: 'and stuff'},
				url = 'urllru';
			spyOn(httpMock, 'get');
			getterServiceMock.getFile(url, callback);

			expect(httpMock.get).toHaveBeenCalledWith(url);
		});
	});

(function(angular){
	'use strict';

	angular
		.module('fileEditorApp', [
			'angularTreeview',
			'ui.codemirror',
			'ngCookies'
		])
		.constant('baseUrl', 'http://localhost:5984/codeditor/')
		.factory("getterService", function($http){
			return {
				getTreeData: function(url, callback){
					$http.get(url)
						.success(function(data){
							callback(data);
						}
					)
				},
				getFile: function(url, callback){
					$http.get(url)
						.success(function(data){
							callback(data);
						}
					)
				}
			}
		});
})(angular);
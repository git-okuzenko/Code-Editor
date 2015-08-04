;(function(angular){
	'use strict';

	angular
		.module('codeditorApp', [
			'angularTreeview',
			'ui.codemirror',
			'ngResource'
		])
		.constant('baseUrl', 'http://localhost:5984/codeditor/')


})(angular);
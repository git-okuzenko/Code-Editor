	
	angular.module('codeditorApp')
		.directive('codeEditor', codeEditor)

		function codeEditor(){
			var codeEditor = {
				restrict: "EA",
				templateUrl: "app/codemirror/codeEditor.html"
			}
			return codeEditor;
		}
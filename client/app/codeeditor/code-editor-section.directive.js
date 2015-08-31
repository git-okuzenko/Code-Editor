	
	angular.module('fileEditorApp')
		.directive('codeEditorSection', codeEditorSection)

		function codeEditorSection(){
			var codeEditorSection = {
				restrict: "EA",
				templateUrl: "app/codeeditor/code-editor-section.html",
				controller: 'codeEditorCtrl'
			}
			return codeEditorSection;
		}
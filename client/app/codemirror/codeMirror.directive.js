
	angular.module('codeditorApp')
		.directive('codeMirror', codeMirror)

		function codeMirror(){
			var directive = {
				link: link,
				restrict: 'A'
			}
			return directive;
			
			function link(scope, element, attributes){
				scope.editor = CodeMirror.fromTextArea(element[0], {
					styleActiveLine: true,
					lineNumbers: true,
					lineWrapping: true,
					matchBrackets: true,
					autoCloseBrackets: true,
					showTrailingSpace: true,
					theme: 'mbo',
					extraKeys: {
						"Ctrl-Space": "autocomplete"
					},
				    foldGutter: true,
				    mode:{
					  name: attributes['codeMirror'],
					  globalVars: true
					},
				 	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"],
				 	lint: true,
				 	highlightSelectionMatches:{
				 		showToken: /\w/
				 	}
				});
				scope.editor.on("gutterClick", function(cm, n){
					cm.setGutterMarker(n, "breakpoints", cm.lineInfo(n).gutterMarkers ? null : angular.element('<span>').html('●')[0]);
				});
			}
		};

		
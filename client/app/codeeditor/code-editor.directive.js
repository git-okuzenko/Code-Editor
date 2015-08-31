
	angular.module('fileEditorApp')
		.directive('codeEditor', codeEditor);

		function codeEditor($timeout){
			var directive = {
				link: link,
				restrict: 'A'
			}
			return directive;
			
			function link(scope, element, attributes){
				scope.editor = CodeMirror.fromTextArea(element[0],{
					styleActiveLine: true,
					lineNumbers: true,
					lineWrapping: true,
					matchBrackets: true,
					autoCloseBrackets: true,
					showTrailingSpace: true,
					theme: String(scope.selected),
					extraKeys: {
						"Ctrl-Space": "autocomplete"
					},
					foldGutter: true,
					mode:{
					  name: attributes['codeEditor'],
					  globalVars: true
					},
					gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "breakpoints"],
					lint: true,
					highlightSelectionMatches:{
						showToken: /\w/
					}
				});
				scope.editor.on("change", function(){
					$timeout.cancel(scope.waiting);
					scope.waiting = $timeout(scope.updateHints, 500);
				});
				$timeout(scope.updateHints, 100);
				
				scope.editor.on("gutterClick", function(cm, n){
					cm.setGutterMarker(n, "breakpoints", cm.lineInfo(n).gutterMarkers ? null : angular.element('<span>').html('●')[0]);
				});
			}
		};

		
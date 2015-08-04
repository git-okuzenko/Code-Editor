
	angular.module('codeditorApp')
		.directive('codeMirror', codeMirror);

		function codeMirror(){
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
				var widgets = [],
					waiting;
					function updateHints(){
						scope.editor.operation(function(){
							var i , len = widgets.length;
						for(i = 0; i < len; ++i)
							scope.editor.removeLineWidget(widgets[i]);
							len = 0;
							JSHINT(scope.editor.getValue());
						for(i = 0; i < JSHINT.errors.length; ++i) {
							var err = JSHINT.errors[i];
							if (!err) continue;
							var errLine = angular.element('<div>').addClass('lint-error').text(err.reason),
								errIcon = angular.element('<span>').addClass('lint-error-icon').text('!!');
								errLine.prepend(errIcon);
							widgets.push(scope.editor.addLineWidget(err.line - 1, errLine[0], {coverGutter: false, noHScroll: true}));
						}
					});
					var info = scope.editor.getScrollInfo(),
						after = scope.editor.charCoords({line: scope.editor.getCursor().line + 1, ch: 0}, "local").top;
					if(info.top + info.clientHeight < after)
						scope.editor.scrollTo(null, after - info.clientHeight + 3);
					}
					scope.editor.on("change", function($timeout){
						clearTimeout(waiting);
						waiting = setTimeout(updateHints, 500);
					});
					setTimeout(updateHints, 100);
					scope.editor.on("gutterClick", function(cm, n){
						cm.setGutterMarker(n, "breakpoints", cm.lineInfo(n).gutterMarkers ? null : angular.element('<span>').html('●')[0]);
					});
			}
		};

		

	angular.module('fileEditorApp')
		.directive('sideBar', sideBar);

		function sideBar(){
			var sideBarFunc = {
				compile: compile,
				restrict: "AE",
				templateUrl: "app/sidebar/sidebar.html"
			}

			function compile(element, attributes){
			var sideBarUl = element.find('nav').find('ul');
				sideBarUl.on('click', function($event){
					if($event.target.tagName === "UL"){
						return
					}
					else{
						angular.forEach($event.target.parentNode.parentNode.children, function(currentLi){
							angular.element(currentLi).children().removeClass('active');
						});
						angular.element($event.target).toggleClass('active');
					}
				})
			}
			return sideBarFunc;
		}
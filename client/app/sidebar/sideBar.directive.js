	
	angular.module('codeditorApp')
		.directive('sideBar', sideBar);

		function sideBar(){
			var sideBarFunc = {
				restrict: "AE",
				templateUrl: "app/sidebar/sidebar.html"
			}
			return sideBarFunc;
		}
'use strict'

angular.module('BHF')
	.controller('C_project', function($scope, $rootScope, $routeParams) {
		$scope.index = $rootScope.msg;
		$rootScope.pageName = "项目详细内容"

		$scope.id = $routeParams.id;

		//get project info and issue list
		$scope.issue = 'issue';

		$rootScope.$on("assetbox", function(event, $params) {
			if ($params.status) {
				$(".project-details").removeClass("project-details-normal")
			} else {
				$(".project-details").addClass("project-details-normal")
			}
		})
	})
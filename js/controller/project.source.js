'use strict'

angular.module('BHF')
	.controller('C_project', function($scope, $rootScope, $routeParams, API) {
		window.scrollTo(0);

		//获取project的详细信息
		$rootScope.pageName = "项目详细内容"
		$scope.projectid = $routeParams.id;
		$scope.issue = 'issue';


		$rootScope.$on("assetbox", function(event, $params) {
			if ($params.status) {
				$(".project-details").removeClass("project-details-normal")
			} else {
				$(".project-details").addClass("project-details-normal")
			}
		})

		function getIssue() {
			API.getIssue($scope.projectid).then(function(data) {
				$scope.issuelist = data.data.items;
			})
		}

		$rootScope.$on("issueposted", function(event) {
			getIssue();
		})

		getIssue();
	})
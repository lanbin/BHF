'use strict'

angular.module("BHF")
    .directive("projectoperate", function() {
        return {
            templateUrl: "views/parts/project-operate.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element,$attrs){
            	var sort = $scope.sort;
            	$($element).removeClass("active").find("a[sort=" + sort + "]").addClass("active");
            }
        }
    })

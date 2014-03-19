'use strict'

angular.module("BHF")
    .directive("issue", function() {
        return {
            templateUrl: "views/parts/issue.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs){
            	console.log($scope)
            }
        }
    })

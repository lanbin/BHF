'use strict'

angular.module("BHF")
    .directive("issue", function($rootScope) {
        return {
            templateUrl: "views/parts/issue.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs){
            }
        }
    })

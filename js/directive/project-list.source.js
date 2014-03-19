'use strict'

angular.module("BHF")
    .directive("projectlist", function() {
        return {
            templateUrl: "views/parts/project-list.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element,$attrs){
            	
            }
        }
    })

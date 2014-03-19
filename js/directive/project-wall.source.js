'use strict'

angular.module("BHF")
    .directive("projectwall", function() {

        return {
            templateUrl: "views/parts/project-wall.html",
            restrict: "E",
            scope: {
            	sortName: "&",
            	moreurl: "&"
            },
            replace: true,
            link: function($scope, $element, $attrs){
            	// console.log($attrs);
            	$scope.sortname = $attrs.sortname
            	$scope.moreurl = $attrs.moreurl
            }
        }
    })

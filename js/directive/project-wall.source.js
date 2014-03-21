'use strict'

angular.module("BHF")
    .directive("projectwall", function() {

        return {
            templateUrl: "views/parts/project-wall.html",
            restrict: "E",
            scope: {
            	itemlist: "@"
            },
            replace: true,
            link: function($scope, $element, $attrs){
                //拿到是字符串
                var sort = $.parseJSON($attrs.itemlist);
            	$scope.sortname = sort.name
                $scope.sortkey = sort.sortkey
            	$scope.items = sort.items
            }
        }
    })

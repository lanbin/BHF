'use strict'

angular.module("BHF")
    .directive("projectwall", function() {

        return {
            templateUrl: "views/parts/projectwall.html",
            restrict: "E",
            replace: true
        }
    })

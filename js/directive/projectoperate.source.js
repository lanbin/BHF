'use strict'

angular.module("BHF")
    .directive("projectoperate", function() {
        return {
            templateUrl: "views/parts/projectop.html",
            restrict: "E",
            replace: true
        }
    })

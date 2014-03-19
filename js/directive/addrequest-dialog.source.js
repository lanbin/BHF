'use strict'

angular.module("BHF")
    .directive("ard", function() {
        return {
            templateUrl: "views/parts/dialog/addRequestDialog.html",
            restrict: "E",
            replace: true
        }
    })

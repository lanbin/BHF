'use strict'

angular.module("BHF")
    .directive("assets", function($rootScope) {
        var status = false;

        return {
            templateUrl: "views/parts/assets.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs){

            	$(".openBtn").on("click", function(){
                    status = !status;
                    $rootScope.$emit("assetbox",{status: status});
                    if(status) {
                        $(".assets-box").removeClass("assets-box-hide")
                        $(this).removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left")
                    }else{
                        $(".assets-box").addClass("assets-box-hide")
                        $(this).removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right")
                    }
                });
            }
        }
    })

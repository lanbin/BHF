'use strict'

angular.module("BHF")
    .directive("issue", function($rootScope) {
        return {
            templateUrl: "views/parts/issue.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs){

            	$rootScope.$on("assetbox", function(event, $params){
                    if($params.status){
                        $(".issue-box").removeClass("issue-box-normal")
                    }else{
                        $(".issue-box").addClass("issue-box-normal")
                    }
                })
            }
        }
    })

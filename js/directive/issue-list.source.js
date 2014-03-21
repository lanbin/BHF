'use strict'

angular.module("BHF")
    .directive("issuelist", function() {
        return {
            templateUrl: "views/parts/issue-list.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs){
               $scope.openComment = function($event){
                    var ct = $event.currentTarget,
                        cb = $(ct).siblings(".comment-box");

                    if($(cb).attr("display") != "block") {
                        $(cb).show();
                    }else{
                        $element.find(".comment-box").hide();    
                    }
               }
            }
        }
    })

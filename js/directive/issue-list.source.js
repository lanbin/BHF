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
                        cb = $(ct).parent().siblings(".comment-box");

                    if(!$(cb).is(":visible")) {
                        $element.find(".comment-box").hide();  
                        $(cb).show();
                    }else{
                        $element.find(".comment-box").hide();  
                    }
               }
            }
        }
    })

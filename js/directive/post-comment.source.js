'use strict'

angular.module("BHF")
    .directive("postcomment", function() {
        return {
            templateUrl: "views/parts/post-comment.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element,$attrs){

                //检测表单，提交，广播事件
            }
        }
    })

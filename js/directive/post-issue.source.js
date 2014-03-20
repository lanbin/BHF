'use strict'

angular.module("BHF")
    .directive("postissue", function() {
        return {
            templateUrl: "views/parts/post-issue.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element,$attrs){
            	$("#callpb-btn").on("click", function(){
                    $(this).toggle();
                    $(".post-box").toggle("slow");
                });

                $("#closepb-btn").on("click", function(){
                    $(".post-box").toggle();
                    $("#callpb-btn").toggle();
                })

                $("#issue-content").on("keydown", function(){
                    $(this).attr("rows", 10)
                }).on("keyup", function(){
                    if($(this).val() == "") {
                        $(this).attr("rows", 3)
                    }
                });

                //检测表单，提交，广播事件
            }
        }
    })

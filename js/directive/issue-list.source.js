'use strict'

angular.module("BHF")
    .directive("issuelist", function() {
        return {
            templateUrl: "views/parts/issue-list.html",
            restrict: "E",
            replace: true,
            link: function($scope, $elment, $attrs){
            	$("#issue-list").on("click", ".issue-reply-btn", function(){
            		var parent = $(this).parent(),
            			issue_id = parent.attr("issue-id"),
            			comment_box = parent.find(".comment-box");

            			if(comment_box.attr("class").indexOf("show") > -1) {
            				comment_box.removeClass("comment-box-show");
            			}else{
            				comment_box.addClass("comment-box-show");
            			}
            			
            			$(this).html($(this).html() == "回复" ? "收起回复" : "回复");
            	})
            }
        }
    })

'use strict'

angular.module("BHF")
    .directive("issuelist", function() {
        var posting = false;
        return {
            templateUrl: "views/parts/issue-list.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs) {
                $scope.openComment = function($event) {
                    var ct = $event.currentTarget,
                        cb = $(ct).parent().siblings(".comment-box");

                    if (!$(cb).is(":visible")) {
                        $element.find(".comment-box").hide();
                        $(cb).show();
                    } else {
                        $element.find(".comment-box").hide();
                    }
                }

                $scope.postComment = function($event) {
                    if ($event.keyCode == 13) {
                        //post
                        posting = true;

                        var formData = {
                            content: $($event.currentTarget).val()
                        }

                        if (formData.content == "") {
                            Messenger().error({
                                message: "你要说什么？",
                                id: "post"
                            });
                            posting = false;
                            return;
                        }

                        API.postComment(formData).then(function(data){

                        });
                    }
                }
            }
        }
    })
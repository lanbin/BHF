'use strict'

angular.module("BHF")
    .filter('contentFormat', function($sce) {
        return function(input) {
            return $sce.trustAsHtml(input.replace(/\n/g,"<br />"))
        }
    })
    .directive("issuelist", function(API) {
        var posting = false,
            infinityFar = 10000000;

        return {
            templateUrl: "views/parts/issue-list.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs) {
                var openedIssueId = -1,
                    cb = null;

                $scope.openComment = function($event) {
                    var ct = $event.currentTarget;
                    cb = $(ct).parent().siblings(".comment-box");

                    if (!$(cb).is(":visible")) {
                        $scope.comments = [];
                        $element.find(".comment-box").hide();
                        $(cb).show();
                        openedIssueId = this.issue.id;
                        getComment(openedIssueId)
                    } else {
                        openedIssueId = -1;
                        $scope.comments = [];
                        $element.find(".comment-box").hide();
                    }
                }

                $scope.postComment = function($event) {
                    if ($event.keyCode == 13) {
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

                        $($event.currentTarget).val("");

                        if (openedIssueId != -1) {
                            API.postComment(openedIssueId, formData).then(function(data) {
                                if (data.data.id > 0) {
                                    Messenger().post({
                                        message: "回复成功",
                                        showCloseButton: true,
                                        type: "success",
                                        id: "post"
                                    });
                                    getComment(openedIssueId)
                                }
                            });
                        }
                    }
                }

                $scope.addDeveloper = function(){
                    console.log("asdasd")
                }

                function getComment(oiId) {
                    API.getComment(oiId).then(function(data) {
                        $scope.comments = data.data.items;
                        setTimeout(function() {
                            window.smoothScroll($(cb).offset().top - 50);
                            $(".comment-list").scrollTop(infinityFar);
                        }, 50)
                    });
                }
            }
        }
    })
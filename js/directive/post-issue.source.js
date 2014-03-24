'use strict'

angular.module("BHF")
    .directive("postissue", function($rootScope, API) {
        var posting = false;
        return {
            templateUrl: "views/parts/post-issue.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs) {

                $("#callpb-btn").on("click", function() {
                    $(this).toggle();
                    $(".post-box").toggle("fast");
                });

                $("#closepb-btn").on("click", function() {
                    $(".post-box").toggle();
                    $("#callpb-btn").toggle();
                })

                $("#issue-content").on("keydown", function() {
                    $(this).attr("rows", 10)
                }).on("keyup", function() {
                    if ($(this).val() == "") {
                        $(this).attr("rows", 3)
                    }
                });

                $("#post-issue-btn").on("click", function() {
                    if (posting) return;
                    posting = true;

                    var formData = {
                        "title": $("#issue-name").val(),
                        "content": $("#issue-content").val(),
                        "tag": $("#issue-tag").val()
                    }

                    if (formData.title == "" ||
                        formData.content == "") {
                        Messenger().error({
                            message: "请填写标题和内容！",
                            id: "post"
                        });
                        posting = false;
                        return;
                    }

                    API.addIssue($scope.projectid, formData)
                        .then(function(data) {
                            $rootScope.$emit("issueposted");
                            $("#issue-name").val("");
                            $("#issue-content").val("");
                            Messenger().post({
                                message: "发帖成功",
                                showCloseButton: true,
                                type: "success",
                                id: "post"
                            });
                            posting = false;
                        });
                })
            }
        }
    })
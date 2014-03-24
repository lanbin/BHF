'use strict'

angular.module("BHF")
    .filter('findFileType', function() {

        return function(input) {
            var tmp = input.split("."),
                type = tmp[tmp.length - 1],
                iconType = "file";

            switch (type) {
                case 'png':
                case 'bmp':
                case 'gif':
                case 'jpg':
                case 'jpeg':
                    iconType = "pic";
                    break;
                case 'rar':
                case 'zip':
                    iconType = "rar";
                    break;
                case 'psd':
                    iconType = "psd";
                    break;
                case 'doc':
                case 'docx':
                    iconType = "doc";
                    break;
                case 'txt':
                    iconType = "txt";
                    break;
                default:
                    iconType = "file"
            }
            return iconType;
        };
    })
    .directive("postissue", function($rootScope, API, $fileUploader) {
        var posting = false;
        return {
            templateUrl: "views/parts/post-issue.html",
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs) {

                var uploader = $scope.uploader = $fileUploader.create({
                    scope: $scope,
                    url: '/api/project/' + $scope.projectid + '/asset',
                    alias: "asset"
                });

                uploader.bind('complete', function( event, item, progress ) {
                    getAsses();
                });

                uploader.bind('error', function( event, item, progress ) {
                    Messenger().post({
                        message: "有素材上传失败，请重新尝试",
                        showCloseButton: true,
                        type: "error",
                        id: "post"
                    });
                });


                var assetSelectedArr = [];

                $scope.updatePanelShow = true;

                $scope.close = $scope.show = function() {
                    $(".post-box").toggle();
                    $("#callpb-btn").toggle();
                    window.smoothScroll($("#post-box").offset().top - 50);
                }

                $scope.updateAssetBtn = function() {
                    $(".update-panel").addClass("update-panel-show");
                }

                $scope.updatePanelHide = function() {
                    $(".update-panel").removeClass("update-panel-show");
                }

                $scope.assetSelect = function($event) {
                    var assetId = this.asset.id,
                        target = $event.currentTarget;
                    if ($(target).hasClass("selected")) {
                        $(target).removeClass("selected");
                        var index = assetSelectedArr.indexOf(assetId);
                        if (index > 0) {
                            assetSelectedArr.splice(index, 1);
                        }
                    } else {
                        $(target).addClass("selected");
                        assetSelectedArr.push(assetId);
                    }
                }

                $scope.t_keydown = function($event) {
                    $($event.currentTarget).attr("rows", 10)
                }

                $scope.t_keyup = function($event) {
                    if ($($event.currentTarget).val() == "") {
                        $($event.currentTarget).attr("rows", 3)
                    }
                }

                function getAsses() {
                    API.getAsset($scope.projectid).then(function(data) {
                        $scope.assetList = data.data.items;
                    })
                }

                $scope.postIssue = function() {
                    if (posting) return;
                    posting = true;

                    var formData = {
                        "title": $("#issue-name").val(),
                        "content": $("#issue-content").val(),
                        "tag": $("#issue-tag").val(),
                        'assets': assetSelectedArr
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
                            $(".asset-list li").removeClass("selected");
                            assetSelectedArr = [];
                            Messenger().post({
                                message: "发帖成功",
                                showCloseButton: true,
                                type: "success",
                                id: "post"
                            });
                            posting = false;
                        });
                }

                getAsses();
            }
        }
    })
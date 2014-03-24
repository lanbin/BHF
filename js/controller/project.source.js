'use strict'

angular.module('BHF')
    .controller('C_project', function($scope, $rootScope, $routeParams, API) {

        $rootScope.pageName = "项目详细内容"
        $scope.projectid = $routeParams.id;

        API.getProject($scope.projectid).then(function(data) {
            $scope.project = data.data.items[0];
        });

        function getIssue() {
            API.getIssue($scope.projectid).then(function(data) {
                $scope.issuelist = data.data.items;
            })
        }

        $rootScope.$on("issueposted", function(event) {
            getIssue();
        })

        getIssue();
    })

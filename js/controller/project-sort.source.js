'use strict'

angular.module('BHF')
    .controller('C_project_sort', function($scope, $rootScope, $routeParams) {
        $scope.index = $rootScope.msg;
        $rootScope.pageName = "项目分类列表"
        $scope.sort = $routeParams.sort;
        
       
    })

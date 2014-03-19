'use strict'

angular.module('BHF')
    .controller('C_index', function($scope, $rootScope) {
        $scope.index = $rootScope.msg;
        $rootScope.pageName = "首页"

        //监听添加成功事件，参数为事件对象，和数据
        $rootScope.$on("addProjectSuccess", function(event, data){
        	console.log("refresh project wall", data)
        })
    })

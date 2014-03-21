'use strict'

angular.module('BHF')
	.controller('C_index', function($scope, $rootScope, API) {
		$rootScope.pageName = "首页"

		//监听添加成功事件，参数为事件对象，和数据
		$rootScope.$on("addProjectSuccess", function(event, data) {
			console.log("refresh project wall", data)
		});

		API.getAllProjects(true).then(function(data) {
			$scope.projectSorts = [{
				name: "进行中的项目",
				sortkey: "w",
				items: data.processing
			}, {
				name: "未开始的项目",
				sortkey: "d",
				items: data.fresh
			}, {
				name: "已完成的项目",
				sortkey: "q",
				items: data.done
			}, {
				name: "被取消的项目",
				sortkey: "d",
				items: data.rejected
			}]
		});
	})
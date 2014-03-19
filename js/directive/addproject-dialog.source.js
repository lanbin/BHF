'use strict'

angular.module("BHF")
	.directive("apd", function($rootScope) {
		var dpOpt = {
			format: 'yyyy-mm-dd HH:ii', //时间格式
			autoclose: true,			//点击后立刻关闭
			language: "zh-CN",			//语言包
			minView: "0",				//时间最小粒度
			weekStart: 1 				//一周从星期一开始
		};

		return {
			templateUrl: "views/parts/dialog/addProjectDialog.html",
			restrict: "E",
			replace: true,
			link: function($scope, $element, $attrs) {

				var start = $("#project-start-date"),
					end = $("#project-end-date"),
					dialog = $('#addProjectDialog'),
					addBtn = $("#addBtn");

				//配置日期选择器
				start.datetimepicker(dpOpt);
				end.datetimepicker(dpOpt);

				//开始时间设置后，设置结束时间的起始时间
				start.on("changeDate", function() {
					end.val("").datetimepicker('setStartDate', start.val());
				});

				//关闭弹窗后所有的内容清空
				dialog.on('hidden.bs.modal', function(e) {
					$(this).find('input').val("");
				})

				//提交新项目
				addBtn.on("click", function(e) {
					dialog.find('input').attr("disabled", "disabled");
					//post undisabled when it success and close the dialog
					//refresh the project wall
					$rootScope.$emit("addProjectSuccess");
				});
			}
		}
	})
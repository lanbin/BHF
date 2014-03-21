'use strict'

angular.module("BHF")
	.directive("apd", function($rootScope, API) {
		var dpOpt = {
			format: 'yyyy-mm-dd HH:ii', //时间格式
			autoclose: true, //点击后立刻关闭
			language: "zh-CN", //语言包
			minView: "0", //时间最小粒度
			weekStart: 1 //一周从星期一开始
		};

		return {
			templateUrl: "views/parts/dialog/addProjectDialog.html",
			restrict: "E",
			replace: true,
			link: function($scope, $element, $attrs) {

				var start = $("#p-start-date"),
					end = $("#p-end-date"),
					dialog = $('#addProjectDialog'),
					addBtn = $("#addBtn"),
					posting = false;

				//配置日期选择器
				start.datetimepicker(dpOpt);
				start.datetimepicker("setStartDate", new Date());
				end.datetimepicker(dpOpt);

				//开始时间设置后，设置结束时间的起始时间
				start.on("changeDate", function() {
					end.val("").datetimepicker('setStartDate', start.val());
				});

				//关闭弹窗后所有的内容清空
				dialog.on('hidden.bs.modal', function(e) {
					$(this).find('input').val("").removeAttr("disabled");
				})

				//提交新项目
				addBtn.on("click", function(e) {
					if (posting) return;
					posting = true;

					var formData = {
						title: $("#p-name").val(),
						description: $("#p-description").val(),
						contact: $("#p-contact").val(),
						start_date: $("#p-start-date").val(),
						end_date: $("#p-end-date").val(),
						repos: $("#p-repos").val(),
						creator: 'someuser',
						timestamp: (new Date()).getTime()
					}

					if (formData.title == "" ||
						formData.description == "" ||
						formData.contact == "" ||
						formData.start_date == "" ||
						formData.end_date == "") {
						Messenger().error({
							message: "所有标星项均需要填写！",
							id: "post"
						});
						posting = false;
						return;
					}

					dialog.find('input').attr("disabled", "disabled");
					API.addProject(formData).then(function(data) {
						if (data.data.id) {
							$rootScope.$emit("addProjectSuccess");
							dialog.modal('hide');
							Messenger().post({
								message: "新项目已增加，请前往项目中填写需求！",
								showCloseButton: true,
								type: "success",
								id: "post"
							});
							posting = false;
						}
					});
				});
			}
		}
	})
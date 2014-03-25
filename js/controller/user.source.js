'use strict'

angular.module('BHF')
	.controller('C_user', function($scope, $rootScope, API) {
		$scope.msg = 'this is C_user';
		$rootScope.pageName = "用户登录";

		$scope.login = function() {
			var formData = {
				username: $("#p-username").val(),
				password: $("#p-passwd").val()
			}

			if (formData.username == "" ||
				formData.password == "") {
				Messenger().error({
					message: "请填写完整用户名或密码",
					id: "post"
				});
				return;
			}

			API.login(formData).r.success(function(data, status) {
				if (status == 200) {
					Messenger().post({
						message: "登录成功，页面即将跳转！",
						id: "post"
					});
					setTimeout(function() {
						window.location.href = "/#/index";
					}, 2000);
				}
			}).error(function(data, status) {
				Messenger().error({
					message: "登录出现错误，请重试！",
					id: "post"
				});
			});
		}

		$scope.register = function() {
			var formData = {
				username: $("#r-user-name").val(),
				password: $("#r-passwd").val(),
				email: $("#r-email").val()
			}

			if (formData.username == "" ||
				formData.password == "" ||
				formData.email == "") {
				Messenger().error({
					message: "请填写完整用户名、密码以及邮箱",
					id: "post"
				});
				return;
			}

			API.register().result(function(data, status) {
				console.log(data);
			}, function(data, status) {
				console.log(data)
			})
		}
	})
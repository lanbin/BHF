/*
 Angular File Upload v0.3.3.1
 https://github.com/nervgh/angular-file-upload
*/
! function(a, b) {
	return "function" == typeof define && define.amd ? (define("angular-file-upload", ["angular"], function(a) {
		return b(a)
	}), void 0) : b(a)
}(angular || null, function(a) {
	var b = a.module("angularFileUpload", []);
	return b.directive("ngFileDrop", ["$fileUploader",
		function(b) {
			"use strict";
			return {
				link: b.isHTML5 ? function(a, b, c) {
					b.bind("drop", function(b) {
						var d = b.dataTransfer ? b.dataTransfer : b.originalEvent.dataTransfer;
						d && (b.preventDefault(), b.stopPropagation(), a.$broadcast("file:removeoverclass"), a.$emit("file:add", d.files, a.$eval(c.ngFileDrop)))
					}).bind("dragover", function(b) {
						var c = b.dataTransfer ? b.dataTransfer : b.originalEvent.dataTransfer;
						b.preventDefault(), b.stopPropagation(), c.dropEffect = "copy", a.$broadcast("file:addoverclass")
					}).bind("dragleave", function() {
						a.$broadcast("file:removeoverclass")
					})
				} : a.noop
			}
		}
	]), b.directive("ngFileOver", function() {
		"use strict";
		return {
			link: function(a, b, c) {
				a.$on("file:addoverclass", function() {
					b.addClass(c.ngFileOver || "ng-file-over")
				}), a.$on("file:removeoverclass", function() {
					b.removeClass(c.ngFileOver || "ng-file-over")
				})
			}
		}
	}), b.directive("ngFileSelect", ["$fileUploader",
		function(a) {
			"use strict";
			return {
				link: function(b, c, d) {
					a.isHTML5 || c.removeAttr("multiple"), c.bind("change", function() {
						b.$emit("file:add", a.isHTML5 ? this.files : this, b.$eval(d.ngFileSelect)), a.isHTML5 && c.attr("multiple") && c.prop("value", null)
					}), c.prop("value", null)
				}
			}
		}
	]), b.factory("$fileUploader", ["$compile", "$rootScope", "$http", "$window",
		function(b, c, d, e) {
			"use strict";

			function f(b) {
				a.extend(this, {
					scope: c,
					url: "/",
					alias: "file",
					queue: [],
					headers: {},
					progress: null,
					autoUpload: !1,
					removeAfterUpload: !1,
					method: "POST",
					filters: [],
					formData: [],
					isUploading: !1,
					_nextIndex: 0,
					_timestamp: Date.now()
				}, b), this.filters.unshift(this._filter), this.scope.$on("file:add", function(a, b, c) {
					a.stopPropagation(), this.addToQueue(b, c)
				}.bind(this)), this.bind("beforeupload", g.prototype._beforeupload), this.bind("in:progress", g.prototype._progress), this.bind("in:success", g.prototype._success), this.bind("in:cancel", g.prototype._cancel), this.bind("in:error", g.prototype._error), this.bind("in:complete", g.prototype._complete), this.bind("in:progress", this._progress), this.bind("in:complete", this._complete)
			}

			function g(c) {
				if (!f.prototype.isHTML5) {
					var d = a.element(c.file),
						e = b(d.clone())(c.uploader.scope),
						g = d.val();
					c.file = {
						lastModifiedDate: null,
						size: null,
						type: "like/" + g.slice(g.lastIndexOf(".") + 1).toLowerCase(),
						name: g.slice(g.lastIndexOf("/") + g.lastIndexOf("\\") + 2)
					}, c._input = d, e.prop("value", null), d.css("display", "none").after(e)
				}
				a.extend(this, {
					isReady: !1,
					isUploading: !1,
					isUploaded: !1,
					isSuccess: !1,
					isCancel: !1,
					isError: !1,
					progress: null,
					index: null
				}, c)
			}
			return f.prototype = {
				constructor: f,
				_filter: function(b) {
					return a.isElement(b) ? !0 : !! b.size
				},
				bind: function(a, b) {
					return this.scope.$on(this._timestamp + ":" + a, b.bind(this))
				},
				trigger: function(a) {
					arguments[0] = this._timestamp + ":" + a, this.scope.$broadcast.apply(this.scope, arguments)
				},
				isHTML5: !(!e.File || !e.FormData),
				addToQueue: function(b, c) {
					var d = this.queue.length,
						e = "length" in b ? b : [b];
					a.forEach(e, function(b) {
						var d = this.filters.length ? this.filters.every(function(a) {
							return a.call(this, b)
						}, this) : !0,
							e = new g(a.extend({
								url: this.url,
								alias: this.alias,
								headers: a.copy(this.headers),
								formData: a.copy(this.formData),
								removeAfterUpload: this.removeAfterUpload,
								method: this.method,
								uploader: this,
								file: b
							}, c));
						d ? (this.queue.push(e), this.trigger("afteraddingfile", e)) : this.trigger("whenaddingfilefailed", e)
					}, this), this.queue.length !== d && (this.trigger("afteraddingall", this.queue), this.progress = this._getTotalProgress()), this._render(), this.autoUpload && this.uploadAll()
				},
				removeFromQueue: function(a) {
					var b = this.getIndexOfItem(a),
						c = this.queue[b];
					c.isUploading && c.cancel(), this.queue.splice(b, 1), c._destroy(), this.progress = this._getTotalProgress()
				},
				clearQueue: function() {
					this.queue.forEach(function(a) {
						a.isUploading && a.cancel(), a._destroy()
					}, this), this.queue.length = 0, this.progress = 0
				},
				getIndexOfItem: function(b) {
					return a.isObject(b) ? this.queue.indexOf(b) : b
				},
				getNotUploadedItems: function() {
					return this.queue.filter(function(a) {
						return !a.isUploaded
					})
				},
				getReadyItems: function() {
					return this.queue.filter(function(a) {
						return a.isReady && !a.isUploading
					}).sort(function(a, b) {
						return a.index - b.index
					})
				},
				uploadItem: function(a) {
					var b = this.getIndexOfItem(a),
						c = this.queue[b],
						d = this.isHTML5 ? "_xhrTransport" : "_iframeTransport";
					c.index = c.index || this._nextIndex++, c.isReady = !0, this.isUploading || (this.isUploading = !0, this[d](c))
				},
				cancelItem: function(a) {
					var b = this.getIndexOfItem(a),
						c = this.queue[b],
						d = this.isHTML5 ? "_xhr" : "_form";
					c[d] && c[d].abort()
				},
				uploadAll: function() {
					var a = this.getNotUploadedItems().filter(function(a) {
						return !a.isUploading
					});
					a.forEach(function(a) {
						a.index = a.index || this._nextIndex++, a.isReady = !0
					}, this), a.length && this.uploadItem(a[0])
				},
				cancelAll: function() {
					this.getNotUploadedItems().forEach(function(a) {
						this.cancelItem(a)
					}, this)
				},
				_render: function() {
					this.scope.$$phase || this.scope.$digest()
				},
				_getTotalProgress: function(a) {
					if (this.removeAfterUpload) return a || 0;
					var b = this.getNotUploadedItems().length,
						c = b ? this.queue.length - b : this.queue.length,
						d = 100 / this.queue.length,
						e = (a || 0) * d / 100;
					return Math.round(c * d + e)
				},
				_progress: function(a, b, c) {
					var d = this._getTotalProgress(c);
					this.trigger("progressall", d), this.progress = d, this._render()
				},
				_complete: function() {
					var b = this.getReadyItems()[0];
					return this.isUploading = !1, a.isDefined(b) ? (this.uploadItem(b), void 0) : (this.trigger("completeall", this.queue), this.progress = this._getTotalProgress(), this._render(), void 0)
				},
				_xhrTransport: function(b) {
					var c = b._xhr = new XMLHttpRequest,
						d = new FormData,
						e = this;
					this.trigger("beforeupload", b), b.formData.forEach(function(b) {
						a.forEach(b, function(a, b) {
							d.append(b, a)
						})
					}), d.append(b.alias, b.file), c.upload.onprogress = function(a) {
						var c = a.lengthComputable ? 100 * a.loaded / a.total : 0;
						e.trigger("in:progress", b, Math.round(c))
					}, c.onload = function() {
						var a = e._transformResponse(c.response),
							d = e._isSuccessCode(c.status) ? "success" : "error";
						e.trigger("in:" + d, c, b, a), e.trigger("in:complete", c, b, a)
					}, c.onerror = function() {
						e.trigger("in:error", c, b), e.trigger("in:complete", c, b)
					}, c.onabort = function() {
						e.trigger("in:cancel", c, b), e.trigger("in:complete", c, b)
					}, c.open(b.method, b.url, !0), a.forEach(b.headers, function(a, b) {
						c.setRequestHeader(b, a)
					}), c.send(d)
				},
				_iframeTransport: function(b) {
					var c = a.element('<form style="display: none;" />'),
						d = a.element('<iframe name="iframeTransport' + Date.now() + '">'),
						e = b._input,
						f = this;
					b._form && b._form.replaceWith(e), b._form = c, this.trigger("beforeupload", b), e.prop("name", b.alias), b.formData.forEach(function(b) {
						a.forEach(b, function(b, d) {
							c.append(a.element('<input type="hidden" name="' + d + '" value="' + b + '" />'))
						})
					}), c.prop({
						action: b.url,
						method: b.method,
						target: d.prop("name"),
						enctype: "multipart/form-data",
						encoding: "multipart/form-data"
					}), d.bind("load", function() {
						var a = d[0].contentDocument.body.innerHTML,
							c = {
								response: a,
								status: 200,
								dummy: !0
							}, e = f._transformResponse(c.response);
						f.trigger("in:success", c, b, e), f.trigger("in:complete", c, b, e)
					}), c.abort = function() {
						var a = {
							status: 0,
							dummy: !0
						};
						d.unbind("load").prop("src", "javascript:false;"), c.replaceWith(e), f.trigger("in:cancel", a, b), f.trigger("in:complete", a, b)
					}, e.after(c), c.append(e).append(d), c[0].submit()
				},
				_isSuccessCode: function(a) {
					return a >= 200 && 300 > a || 304 === a
				},
				_transformResponse: function(a) {
					return d.defaults.transformResponse.forEach(function(b) {
						a = b(a)
					}), a
				}
			}, g.prototype = {
				constructor: g,
				remove: function() {
					this.uploader.removeFromQueue(this)
				},
				upload: function() {
					this.uploader.uploadItem(this)
				},
				cancel: function() {
					this.uploader.cancelItem(this)
				},
				_destroy: function() {
					this._form && this._form.remove(), this._input && this._input.remove(), delete this._form, delete this._input
				},
				_beforeupload: function(a, b) {
					b.isReady = !0, b.isUploading = !0, b.isUploaded = !1, b.isSuccess = !1, b.isCancel = !1, b.isError = !1, b.progress = 0
				},
				_progress: function(a, b, c) {
					b.progress = c, b.uploader.trigger("progress", b, c)
				},
				_success: function(a, b, c, d) {
					c.isReady = !1, c.isUploading = !1, c.isUploaded = !0, c.isSuccess = !0, c.isCancel = !1, c.isError = !1, c.progress = 100, c.index = null, c.uploader.trigger("success", b, c, d)
				},
				_cancel: function(a, b, c) {
					c.isReady = !1, c.isUploading = !1, c.isUploaded = !1, c.isSuccess = !1, c.isCancel = !0, c.isError = !1, c.progress = 0, c.index = null, c.uploader.trigger("cancel", b, c)
				},
				_error: function(a, b, c, d) {
					c.isReady = !1, c.isUploading = !1, c.isUploaded = !0, c.isSuccess = !1, c.isCancel = !1, c.isError = !0, c.progress = 100, c.index = null, c.uploader.trigger("error", b, c, d)
				},
				_complete: function(a, b, c, d) {
					c.uploader.trigger("complete", b, c, d), c.removeAfterUpload && c.remove()
				}
			}, {
				create: function(a) {
					return new f(a)
				},
				isHTML5: f.prototype.isHTML5
			}
		}
	]), b
});
//# sourceMappingURL=angular-file-upload.min.map
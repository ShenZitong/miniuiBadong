(function(window) {
	window.PublicMethods = {
		ajax: function(params) {
			if(!$) return false;
			var url = params.url, //string
				type = !!params.type ? params.type : "post", //string
				param = !!params.param ? params.param : {}, //object
				asnyc = !!params.asnyc ? params.asnyc : true, //boole
				cache = !!params.cache ? params.cache : true, //boole
				pageReSatus = !params.pageReSatus ? 0 : params.pageReSatus; //int
			if(pageReSatus == 1) {
			} else if(pageReSatus == 2) {
			}
			$.ajax({
				url: url,
				type: type,
				data: param,
				asnyc: asnyc,
				cache: cache,
				beforeSend: function() {
					params.beforeSend && params.beforeSend();
				},
				success: function(result) {
					params.success && params.success(result);
				},
				error: function(e) {
					params.error && params.error(e);
				},
				complete: function(ev) {
					params.complete && params.complete(ev);
				}
			})
		}
	}
})(window);
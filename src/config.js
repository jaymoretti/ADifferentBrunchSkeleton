exports.config = {
	paths : {
		public : "../public",
		watched : ["app", "static", "vendor", "styles"]
	},
	modules : {
		wrapper : "commonjs"
	},
	sourceMaps : true,
	conventions : {
		assets : /^static/
	},
	files: {
		javascripts:{
			joinTo:{
				'js/app.js': /^app/,
				'js/vendor.js': /^vendor/
			}, 
			order : {
				before : ['vendor/TweenMax.min.js', "vendor/jquery-1.10.2.min.js"]
			}
		},
		stylesheets:{
			joinTo: {
				'css/styles.css' : /styles/
			}
		}
	}
}
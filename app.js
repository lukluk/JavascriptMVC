var app={
	index:function(){
		_.view.render('home');
	},	
	run:function(){				
			_.require(
				['js/gmaps.js',
				 'js/jquery.mobile-1.3.2.min.js',
				 'js/jquery.flexnav.min.js',
				 'js/jquery.jscrollpane.min.js',
				 'json/data.js'
				],
				['css/flexnav.css',
				 'css/jquery.mobile-1.3.2.min.css',
				 'css/jquery.mobile.theme-1.3.2.css',
				 'css/jquery.jscrollpane.css'
				],function(){
					_.loadViews(['home'],app.index);
			});		
	}
}

app.run();
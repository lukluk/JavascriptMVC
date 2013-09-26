var  _={		

	progress:null,
	pnum:0,
	totalView:0,
	loadData:function(name){
		return $.totalStorage(name);
	},	
	ui:{
		createOpt:function(val,name){
			name+='';
			return '<li data-name="'+name.toLowerCase()+'" data-val="'+val+'"><a >'+name+'</a></li>';
		},			
		dropdown:function(ele,config){
			var com='<a class="iconx" title="'+config.icon+'">'+config.icon+'</a><div class="listcontainer"><ul class="listx"></ul></div>'			
			ele.after(com);
			var options='';
			ele.addClass('input');	
			ele.attr('autocomplete','off');
			config.class='.'+config.class;
			$(config.class+' a.iconx').click(function(){
			 	if(!$(config.class+' .listcontainer').hasClass('slideup'))
				$(config.class+' .listcontainer').addClass('slideup');		 	
				$(config.class+' .listcontainer').css('height','200');		
			});

			if(typeof config.iconleft =='undefined')
			{
				config.iconleft=0;
			}
			if(typeof config.searchby =='undefined')
			{
				config.searchby='name';
			}
			var w=parseInt($(config.class).css('width'))-50+config.iconleft;
			$(config.class+' .iconx').css('margin-left',w+'px');
			for(var i in config.data)
			{
				options+=_.ui.createOpt(config.data[i].value,config.data[i].name);
			}
			$(config.class+' .listx').html(options);

			ele.focus(function(){
			 	if(!$(config.class+' .listcontainer').hasClass('slideup'))
				$(config.class+' .listcontainer').addClass('slideup');		 	
				$(config.class+' .listcontainer').css('height','200');
			});
			ele.blur(function(){
				$(config.class+' .listcontainer').css('height','0');
			 });		 
			var pan=$(config.class+' .listcontainer').jScrollPane({
				contentWidth: '0px'
			});
			var panapi = pan.data('jsp');
			ele.bind('keyup', function(e) {
				var code = (e.keyCode ? e.keyCode : e.which);
				 if(code == 13) { //Enter keycode
					ele.val($(config.class+' .listx li.hover').attr('data-name'));
					ele.attr('data-val',$(config.class+' .listx li.hover').attr('data-val'));	
					$(config.class+' .listcontainer').css('height','0');		   
				 }else
				 {
				 	console.log(config.class+' .listx li[data-'+config.searchby+'^='+$(this).val().toLowerCase()+']');
					if($(config.class+' .listx li[data-'+config.searchby+'^='+$(this).val().toLowerCase()+']').length>0)
					{
					var offset = $('.listx li').first().position().top;
					var pos=$(config.class+' .listx li[data-'+config.searchby+'^='+$(this).val().toLowerCase()+']:eq(1)').position().top - offset;
					$(config.class+' .listx li').removeClass('hover');
					$(config.class+' .listx li[data-'+config.searchby+'^='+$(this).val().toLowerCase()+']:eq(1)').addClass('hover');
						panapi.scrollTo(0,pos);
					}
				}
			 });		 		
			$(config.class+' .listx li').click(function(){
				ele.val($(this).attr('data-name'));
				ele.attr('data-val',$(this).attr('data-val'));
				$(config.class+' .listcontainer').css('height','0');			
			});
			$(config.class+' .listcontainer').css('height','0');			

		}
	},	
	view:{
		render:function(name)
		{
			var ele='app';
			//console.log('render ',name);
			$('#'+ele).html(_.loadData(name));
			if(typeof window[name] != 'undefined')
			if(typeof window[name].onShow == 'function')
			{
				window[name].onShow();
			}
		},
		renderTo:function(ele,name)
		{
			//console.log('render ',name);
			$('#'+ele).html(_.loadData(name));
			if(typeof window[name] != 'undefined')
			if(typeof window[name].onShow == 'function')
			{
				window[name].onShow();
			}
		}

	},	
	getView:function(name,whendone)
	{

			$.get('view/'+name+'.html',function(data){
				$.totalStorage(name, data);
				_.pnum+=1;				
				if(_.totalView==_.pnum)
				{		
					whendone();
					return true;
				}
			});
	},
	loadViews:function(names,whendone){		
		this.totalView=names.length;
		pnum=0;
		for(var i in names)
		{
			this.getView(names[i],function(){
				console.log('done');
				_.loadModels(names,whendone);
			});
		}
	},
	loadModels:function(models,whendone){
		this.loadJs(models,'model','.js',whendone);
	},
	loadJs:function(js,path,ext,whendone){
		//console.log(js);
		var total=js.length;
		var progress=0;
		var ds='';
		if(path!='')
		ds='/';
		for(var i in js)
		{

			loader.injectJs(path+ds+js[i]+ext,function(){
				progress+=1;
				if(typeof _.progress=='function') _.progress((progress/total)*100);
				if(progress==total)
				{
					whendone();
					return true;
				}
			});
		}
	},
	loadCss:function(css,path,ext,whendone){
		var total=css.length;
		var progress=0;
		var ds='';
		if(path!='')
		ds='/';
		
		for(var i in css)
		{
			loader.injectCss(path+ds+css[i]+ext,function(){
				progress+=1;
				if(progress==total)
				{
					whendone();
					return true;
				}
			});
		}
	},

	require:function(js,css,whendone){
		
		var jsdone=false;
		var cssdone=false;
		this.loadJs(js,'','',function(){
			jsdone=true;
			if(jsdone && cssdone)
			{
				whendone();
				return true;
			}
		});
		this.loadCss(css,'','',function(){
			cssdone=true;
			if(jsdone && cssdone)
			{
				whendone();
				return true;
			}

		});

	}	

	
}
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return '&pound;'+s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
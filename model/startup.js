
window['startup']={
	onShow : function(){
		_.progress=function(percent)
		{
			$('#progress').find('span.green').css('width',percent+'%');
			$('#progress').find('span>span').html(percent+'%');
		}
	}
}
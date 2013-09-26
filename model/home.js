window['home']={
	onShow:function(){
		 var minprice=new Array();
		 minprice.push({name:'No Minprice',value:''});
		 for(var n=10000;n<=90000;n+=10000)
		 {
		 	minprice.push({name:n.formatMoney(0,'.',','),value:n});
		 }
		 for(var n=100000;n<=900000;n+=100000)
		 {
		 	minprice.push({name:n.formatMoney(0,'.',','),value:n});
		 }
		 for(var n=1000000;n<=15000000;n+=1000000)
		 {
		 	minprice.push({name:n.formatMoney(0,'.',','),value:n});
		 }		
		 var maxprice=new Array();
		 maxprice.push({name:'No Minprice',value:''});
		 for(var n=10000;n<=90000;n+=10000)
		 {
		 	maxprice.push({name:n.formatMoney(0,'.',','),value:n});
		 }
		 for(var n=100000;n<=900000;n+=100000)
		 {
		 	maxprice.push({name:n.formatMoney(0,'.',','),value:n});
		 }
		 for(var n=1000000;n<=15000000;n+=1000000)
		 {
		 	maxprice.push({name:n.formatMoney(0,'.',','),value:n});
		 }		
		var bedroom=new Array();
		bedroom.push({name:'Studio',value:'studio'})
		for(var n=1;n<=10;n++)
		{
			bedroom.push({name:n+'+',value:n});
		}
		console.log(minprice,bedroom);
		 $(".flexnav").flexNav();
		 _.ui.dropdown($('#country'),{
		 	class:'country',
		 	icon:'&#59171;',
		 	data:country
		 });
		 _.ui.dropdown($('#minprice'),{
		 	class:'minprice',
		 	icon:'&#9662;',		 	
		 	data:minprice,
		 	iconleft:15,
		 	searchby:'val'
		 });		 
		 _.ui.dropdown($('#maxprice'),{
		 	class:'maxprice',
		 	icon:'&#9662;',		 	
		 	data:maxprice,
		 	iconleft:15,
		 	searchby:'val'
		 });		 
		 _.ui.dropdown($('#type'),{
		 	class:'type',
		 	icon:'&#9662;',		 	
		 	data:type,
		 	iconleft:15
		 });		 
		 _.ui.dropdown($('#bedroom'),{
		 	class:'bedroom',
		 	icon:'&#9662;',		 	
		 	data:bedroom,
		 	iconleft:15
		 });	
		 $('.homemenu').addClass('slideup');
		 $('#moreoption').click(function(){
		 	if($('#moreoption').html()=='Less Options')
		 	{
		 		
		 		$('.homemenu').css('height','170px');
		 		$('#moreoption').html('More Options');
		 	}else
		 	{
		 		$('.homemenu').css('height','300px');
		 		$('#moreoption').html('Less Options');

		 	}

		 });

	}
}
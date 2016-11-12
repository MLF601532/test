$(function(){
			var myswiper=new Swiper("#mys",{
				loop:true,
				/*autoplay:1000,
				speed:1000,*/
//				direction:"vertical",
				 pagination: '.swiper-pagination',
	
				  paginationClickable: true,//可以实现滑动效果
				    
				    // 如果需要前进后退按钮
				    nextButton: '.swiper-button-next',
				    prevButton: '.swiper-button-prev',
				    
				    // 如果需要滚动条
				    scrollbar: '.swiper-scrollbar'
			})
				checkLogin();
			$(".slide5").on("tap",function(){
			
				if(userinfo==null){
					location.href="login.html";
				}else{
					setTimeout(function(){
						window.open("list.html","_parent");
					},1000);
				}
				
				
			})
			
			
})

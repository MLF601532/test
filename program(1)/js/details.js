$(function(){
			var myswiper=new Swiper("#mys",{
				loop:true,
				autoplay:1000,
				speed:1000,
				pagination: '.swiper-pagination',
				    
	
			})
			//字符串截取获得所需ID
			 var id=window.location.href.split("=")[1];
			 
				console.log(id);
			$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php?goodsID"+id,
			async:true,
			 data:{
				goodsID:id
			 },
			dataType:"jsonp",
			success:function(data){
				
				console.log(data)
 				var arr=JSON.parse(data[0].imgsUrl);//由JSON字符串转换为JSON对象
 			//	console.log(arr);
 				var $img1=$("<img>").attr({"src":arr[0]});
 				$(".slide1").append($img1);
 				var $img2=$("<img>").attr({"src":arr[1]});
 				$(".slide2").append($img2);
 				var $img3=$("<img>").attr({"src":arr[2]});
 				$(".slide3").append($img3);
 				var $ul=$('<ul><li class="li1" id="'+data[0].goodsID+'">'+data[0].goodsName+'</li><li>￥'+data[0].price+'</li><li>购买人数：'+data[0].buynumber+'</li></ul>');
 				$("#middle ul").append($ul);
 				var $p=$('<p class="p1" id="'+data[0].goodsID+'"></p>')
				$("footer").append($p);
				console.log(data[0].buynumber);
			}
		});
//验证是否登录，并判断购物车里是已有商品
		var num=0;
		$(".p1").on("tap",function(){
				checkLogin();
				//console.log(1);
			if(userinfo==null){
				setTimeout(function(){
					location.href="login.html";
				},1000);
			}
			else if(userinfo!=null){
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getCar.php?userID="+userinfo.userID,
					async:true,
					
					dataType:"jsonp",
					success:function(data){
						console.log(data);
							var aaa = false;//有
							for(var i in data){
								//console.log(data[i].goodsID+"----"+id);
							if(data[i].goodsID==id){
								//如果商品存在
									//console.log(1);
								aaa = true;	
								$("footer .p2").css("display","block");
								$("footer .p2").html("该商品已添加，继续购物");
								data[i].number++;
								num=data[i].number;
								updatacar(userinfo,id,num);
							}
						}

					//购物车中未找到该商品，本次点击添加	
					if(!aaa){
						updatacar(userinfo,id,1);
				          
						$("footer .p2").css("display","block");
						$("footer .p2").html("添加购物车成功");
						setTimeout(function(){
											location.href="shopcar.html";
							},1000);

					}

				}
						
				});
			}
		});
		//封装更新购物车
		function updatacar (userinfo,id,num) {
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userinfo+"&goodsID="+id+"number="+num,
				async:true,
				data:{
						userID:userinfo,
						goodsID:id,
						number:num
					 },				
				success:function(data){
					
				}
			});
			
		}
			
	
		
				
	
	$("header .span1").click(function(){
		window.open("list.html","_parent");
	})
	$("header .span3").click(function(){
		window.open("shopcar.html","_parent");
	})
		
		
		
		
		

		
		
		
})

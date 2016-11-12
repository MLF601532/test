$(function(){
	/*	var myscroll = new IScroll(".content",{probeType:3,
						mouseWheel: true,
    					scrollbars: true
				});*/
	checkLogin();
	
	
	
 /*var id=window.location.href.substring(51);
	 console.log(id);*/
	if(userinfo==null){
		location.href="login.html";
	}
	//console.log(userinfo);
	else if(userinfo!=null){
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getCar.php?userID"+userinfo,
			async:true,
			data:{userID:userinfo },
			dataType:"jsonp",
			success:function(data){
				console.log(data);
				
				
				for(var i in data){
					console.log(data[i].number);
				var $div1=$('<div class="show"><div class="photo"><img src="'+data[i].goodsListImg+'" ID="'+data[i].goodsID+'"></div><ul><li>'+data[i].goodsName+'</li><li>单价 ：<i>￥</i><span class="price">'
				+data[i].price+'</span></li><li>数量:<input type="button" class="sub" value="-"><input class="number" type="text" value="'+data[i].number+'"><input class="add" type="button" value="+"></li><li><input class="del" type="button"  value="del"/></li></ul></div>');
				$(".content").append($div1);
				count();
				}
			/*	myscroll.refresh();*/
			
	//点击加号值增加
			$(".content").on("tap",".add",function(){
				var goodsID=$(this).parent().parent().siblings().find("img").attr("ID");
				var _val=$(this).siblings(".number").val();
				_val++;
				$(this).siblings(".number").val(_val);
					updata(userinfo,goodsID,_val);
					count();
		    })
	//点击减号值减少
		$(".content").on("tap",".sub",function(){
			var goodsID=$(this).parent().parent().siblings().find("img").attr("ID");
			var _val=$(this).siblings(".number").val();
			_val--;
			if(_val<=1){
				_val=1;
			}
			$(this).siblings(".number").val(_val);
			updata(userinfo,goodsID,_val);
			count();
		})
		$(".del").on("tap",function(){
			var goodsID=$(this).parent().parent().siblings().find("img").attr("ID");
			$(this).parent().parent().parent().remove();
			updata(userinfo,goodsID,0);
			count();
			//console.log(userinfo+":------------"+goodsID);
		})
		                                                                                            
	
			}
		});
		
	}

		function updata(userinfo,goodsID,_val){
					$.ajax({
						type:"GET",
						url:"http://datainfo.duapp.com/shopdata/updatecar.php",
						data:{userID:userinfo,goodsID:goodsID,number:_val},
						dataType:"json",
						success:function(data){
							//console.log(data);
						}
					})
				}


	
	
			//商品数量的变化
			
				
		function count(){
					var all_num = 0,
						all_price = 0;
					var leng=$(".number").length;
						for(var i=0;i<leng;i++){
							all_num += parseInt($(".number").eq(i).val());
				         	all_price += parseFloat($(".price").eq(i).html())*parseInt($(".number").eq(i).val());
						
					//	console.log(all_num+"-----"+all_price);
					}
					$(".middle .p1 span").html(all_num);
					$(".middle .p2 span").html(all_price.toFixed(1));
		}			
		
		
		
		$("footer ul .li2").on("tap",function() {
			window.open("list.html","_parent");
		})
		$("footer ul .li1").on("tap",function() {
			window.open("index.html","_parent");
		})
	

	
})

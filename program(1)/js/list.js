$(function(){
//=====调用ajax获取图片信息====
$("#prolist").height($("#content").height()-48);
var myscroll = new IScroll("#prolist",{probeType:3,
						mouseWheel: true,
    					scrollbars: true,
    					click:true,	
				});
var scroll = new IScroll("#typelist",{probeType:3,
					scrollX:true,
					scrollbars: false
				});	
				//使用iscroll时，保证大盒子里只有一个小盒子，例如，#typelist中只能有ul,而不能有其他的div。
				//ul里可以随意放元素。
			
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		dataType:"jsonp",
		success : function (data) {
			//console.log(data);
			for(var i in data){
			//	console.log(data[i].goodsListImg);
				var $li = $('<li id = "'+data[i].goodsID+'"><img /><p class = "p1">'+data[i].goodsName+'</p><p class = "p2">￥'+data[i].price+'</p></li>');
				$($li).find('img').attr('src',data[i].goodsListImg);
				$('#prolist ul').append($li);
			}
			
			myscroll.refresh();
			//当点击下一个时，自动返回顶部
			myscroll.scrollTo(0,0);
			//======点击列表内容获取详情页===
	
			$('#prolist ul li').click(function(){
				ID = $(this).attr('id');
//				sessionStorage.setItem('ID',ID);
				window.location.href = "details.html?id="+ID;
			})
	
		}
	});
		//====调用ajax获取商品分类
	
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data);
			for(var i in data){
				var $li = $('<li class="iconfont">'+data[i].icon+'<p class="three"></p>'+'</li>');
				$('#content #typelist ul').append($li);
			}
			//====判断所在typelist的li在prolist中所在区
			$('#content #typelist ul li').on("tap",function(){
				var ind = $('#content #typelist ul li').index(this);
				
				$('#content #typelist ul li').css('color','#000');
				$('#content #typelist ul li').find(".three").hide();
				$(this).css('color','red');
				$(this).find(".three").show();
				/*$(this).addClass(".three");*/
				
//				console.log(ind);
				classID = data[ind].classID;
				console.log(classID);
				$('#content #prolist ul').html('');
//				console.log(classID); 
				addclass(classID);
				
			})
			var w=data.length*48;
			$("#typelist ul").width(w+"px");
			scroll.refresh();
		}
		
	});
	function addclass(id){
		
	//=====调用ajax获取图片信息====
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php?classID="+id,
		async:true,
		dataType:"jsonp",
		success : function (data) {
//			console.log(data);
			for(var i in data){
//				console.log(data[i].goodsListImg);
				var $li = $('<li id = "'+data[i].goodsID+'"><img /><p class = "p1">'+data[i].goodsName+'</p><p class = "p2">￥'+data[i].price+'</p></li>');
				$($li).find('img').attr('src',data[i].goodsListImg);
				$('#prolist ul').append($li);
		
			}
			
			myscroll.refresh();
			myscroll.scrollTo(0,0);
			//======点击列表内容获取详情页===
	
		$('#prolist ul li').click(function(){
				ID = $(this).attr('id');
//				sessionStorage.setItem('ID',ID);
				window.location.href = "details.html?id="+ID;
			})
	
		}
	});	
	
	
}
	$("footer ul .li2").on("tap",function() {
			window.open("list.html","_parent");
		})
	$("footer ul .li1").on("tap",function() {
			window.open("index.html","_parent");
		})
	$("footer ul .li3").on("tap",function() {
			window.open("shopcar.html","_parent");
		})
	
	
	
})

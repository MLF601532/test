$(function(){
	//显示密码验证
		$(".btn").click(function(){
			if($(".btn").is(":checked")){
				$(".input2").prop("type","text");
			}else{
				$(".input2").prop("type","password");
			}
		})
		//登录验证
		$(".input3").on("tap",function(){
					var status ="login";
					var userID=$(".input1").val();
					var password = $(".input2").val();
					//判断输入框有没有空
					if($(".input1").val()==""||$(".input2").val()==""){
						$(".span4").html("输入框不能为空");
						$(".span4").css({
							fontSize:"1.4em",
							color:"red"
						})
					}else{
						$.ajax({
						url:"http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password,
						type:"get",
						success:function(data){
							var info = JSON.parse(data);
							console.log(info);
							if(info==0){
								$(".span4").html("用户名不存在");
								$(".span4").css({
									fontSize:"1.4em",
									color:"red"
									})
								}
							else if(info==2){
								$(".span4").html("用户密码不符");
								$(".span4").css({
									fontSize:"1.4em",
									color:"red"
									})
								}else{
										//验证记住密码
									if($(".btn1").is(":checked")){
										sessionStorage.setItem("userinfo",userID);
										localStorage.setItem("userinfo",userID);
											$(".span4").html("登录成功");
											$(".span4").css({
												fontSize:"1.4em",
												color:"red"
											})	
										setTimeout(function(){
												window.open("list.html","_parent");
											},1000)
									}else{
										localStorage.removeItem("userinfo");
										sessionStorage.setItem("userinfo",userID);
										$(".span4").html("登录成功");
										$(".span4").css({
											fontSize:"1.4em",
											color:"red"
										})	
										setTimeout(function(){
												window.open("list.html","_parent");
											},1000)
									}
				
								}
							}
						})
					}
				})
	
	
		

		
})

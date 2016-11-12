$(function(){
	//验证用户名
		var t1=false;
		var t2=false;
		var t3=false;
				
		
	    $(".input1").change(function(){
        var val = $(this).val();
        if (val.length != 11 || isNaN(val)) {
            $(".span1").html("请输入11位数字手机号码");
          	$(".span1").css({
                fontSize : "1.4em",
                color : "red",

           })
        }else{
        	 t1=true;
        }
    })
	$(".input1").click(function(){
    	 $(".span1").html(" ");
     })
	//验证密码
	   $(".input2").change(function(){
        var _val = $(this).val();
       // alert(_val);
        if (/^[a-zA-Z0-9]{8,16}$/.test(_val)){
      		t2=true;
	  		
            
        } else{
           $(".span2").html("密码应为8-16个字符");
	            $(".span2").css({
	                fontSize : "1.4em",
	                color : "red"
	            })
	            t2=false;

        }

    })
	  $(".input2").click(function(){
    	 $(".span2").html(" ");
     })
	  //验证再次输入
	  $(".input3").change(function(){
	  	var _vall=$(this).val();
	  //	console.log(_vall);
	  	if($(".input2").val()!=_vall){
           $(".span3").html("两次密码输入不一致");
            $(".span3").css({
                fontSize : "1.4em",
                color : "red"
            })
            t3=false;
	  	}else{
	  		t3=true;
	  	}
	  })
	   $(".input3").click(function(){
    	 $(".span3").html(" ");
     })
	   //验证注册
	   
	   	$(".connect-2").on("tap",function(){
	   		if($(".input1").val()==""||$(".input2").val()==""||$(".input3").val()==""){
	   			$(".span4").html("输入框不能有空");
	   			   $(".span4").css({
		                fontSize : "1.4em",
		                color : "red"
            		})
	   			
	   		}
	   		if(t1&&t2&&t3){
	   			var status ="register";
				var userID=$(".input1").val();
				var password = $(".input2").val();
					$.ajax({
						url:"http://datainfo.duapp.com/shopdata/userinfo.php",
						type:"get",
	             /*       "data":"?status=register&userID="+userID+"&password="+password,*/
						data:{
							status:status,
							userID:userID,
							password: password
						},
						success:function(data){
							
							//var info = JSON.parse(data);
							console.log(data);
							if(data==0){
								$(".span4").html("用户名重复");
									 $(".span4").css({
							                fontSize : "1.4em",
							                color : "red"
            						})
							}
							if(data==1){
								$(".span4").html("注册成功");
									$(".span4").css({
							                fontSize : "1.4em",
							                color : "red"
            						})
									setTimeout(function(){
										window.open("login.html","_parent");
									},1000)
							}else{
								$(".span4").html("数据库报错");
									 $(".span4").css({
							                fontSize : "1.4em",
							                color : "red"
            						})
							}
						}
					})
				}
	   
	   	})
	   			
	 
	  	
	
	  
})

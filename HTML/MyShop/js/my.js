$(document).ready(function (){
	
	
	$("#login_b").click(function(){
			let id = $("#form_id").val();
			let pw = $("#form_pw").val();
			let temp ={
					sign:"login",
					id: id,
					pw: pw
			};
			var jsonOBJ =JSON.stringify(temp); //javascript > json
		//alert(jsonOBJ);
		$.ajax({url:"main", 
			type:"POST", 
			data:jsonOBJ, 
			dataType:"json",
			success:function(returnData){
				if(returnData.resultCode==1){
					alert(returnData.message);
					$("#login_b").hide();
					$("#logDiv").html("<input type='button' value='로그아웃'>");
					$("#form_id").remove();
					$("#form_pw").remove();
					$("#content").html("<img src='public/chanel.jpg' width='300'>");
				} else if(returnData.resultCode==0) {
					alert(returnData.message);
				}				
			},
	        error: function(err) {
	            alert(err);
	        }
		});  
	});
});
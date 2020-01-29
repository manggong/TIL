$(document).ready(function (){
	let origin_menu;//=$("#menu").html();	
	
	$(document).on("click","#login",function(){
		let login_form = "<form id= 'login_form'>";
			  login_form += "<input type='email'  id='id_val' name='email' placeholder='Email' required><br>";
			  login_form += "<input type='password'  id='pw_val'  name='password' placeholder='Password' required><br>";
			  login_form += "<input type=button id='login_send' value='Log In'>";
			  login_form += "</form>"; 
			  origin_menu=$("#menu").html();
			 $("#menu").html(login_form);
	});
	
	$(document).on("click","#login_send",function(){
	    let id = $("#id_val").val();
		alert("환영합니다 "+id);
		$("#menu").html(origin_menu);
		$("#login_toggle").html('<a id= "logout" class="menu__column" ><p class="menu_class">Logout</p></a><br />')
	});
	
	$(document).on("click","#logout",function(){
		alert("감사합니다")
		$("#menu").html(origin_menu);
	});
});
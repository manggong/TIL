2020.01.07.



# HTML

- memberInsert.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<base href="https://www.w3schools.com/" target="_blank">
<title>memberInsert</title>
</head>
<body>
	<h1>회원가입</h1>
	<hr><hr>
	<form action="main" method="post">
	  <input type="hidden" name="sign" value="memberInsert">
		<fieldset>
			<legend>인적 사항</legend>
			이름 : <input name="name" value="ID 입력요망">
			주민번호 : <input name="ssn1">-<input name="ssn2">
			<br>
			국적 : <select name="country">
					<option value="korea">내국인(대한민국)</option>
					<option value="foreign">외국인</option>
				   </select>
			<br>
	취득 자격증 : <select name="license" multiple size="1">
					<option value="L1">정보처리기사</option>
					<option value="L2">정보보안기사</option>
				   </select>
		</fieldset>
		
		<br>
		
		<fieldset>
			<legend>취미</legend>
				<input type="checkbox" name="habbit" value="book" checked id="b1"/> <label for="b1">독서</label>
				<input type="checkbox" name="habbit" value="badook"  id="b2"/> <label for="b2">바둑</label>
				<input type="checkbox" name="habbit" value="golf"  id="b3"/> <label for="b3">골프</label>
				<input type="checkbox" name="habbit" value="duengsan"  id="b4"/> <label for="b4">등산</label>
				<input type="checkbox" name="habbit" value="trip"  id="b5"/> <label for="b5">여행</label>
				<input type="checkbox" name="habbit" value="etc"  id="b6"/> <label for="b6">기타</label>
		</fieldset>		
		
		<fieldset>
			<legend>기타</legend>
			이메일 : <input type="email" placeholder="xxx@xx.xx.xx.xx" name="mail" />
			웹주소 : <input type="url" placeholder="http://xxx.xxx.xxx.xxx]" name="address" />
			연락처 : <input type="tel" pattern="{0-9}{2,3}-{0-9}{3,4}-{0-9}{4}" placeholder="0**-999-*999" />
			<br>&nbsp; 검색1 : <input type="text" >
			<br>&nbsp; 검색2 : <input type="search">
			<br>회의날짜 : <input type="date" name="mday" />
			<br>회의시간 : <input type="time" name="mtime" />
			<br>시험성적 : <input type="range" min="0" max="100" step="5" value="0" />
			<br>색상확인 : <input type="color" value="#ff0000" name="favorite" />
		</fieldset>
		
		<fieldset>
			<legend>텍스트 버튼</legend>
			<a href =" " target="_blank" ><input type="button" value="이동1"/></a>
			<input type= "button" value="버튼 클릭" onclick="alert('버튼이 클릭됨!');"/>
			<a href ="" target="_blank"><button type="button">이동2</button></a>
		</fieldset>
		
		<fieldset>
			<legend>required, autofocus, disabled</legend>
			<br> 학부 : <input type="text" required />
			<br> 이름 : <input type="text" required />
			<br> 주전공 : <input type="text" autofocus />
			<br> 부전공 : <input type="text" required />
			<br> 자율전공 : <input type="text" disabled />
			<br> 동아리 1 : <input type="text" required />
			<br> 동아리 2 : <input type="text" />
			<br> 취득자격 : <input type="text" autofocus />
			<br> 봉사활동 : <input type="text" required />
		</fieldset>
		
		<fieldset>
			<legend>HTML5</legend>
      			<hr />
      			<a href="html/" >
      			  <button type="button">Learn HTML</button>
  			    </a>
   			   <a href="css/" >
 			       <button type="button">Learn CSS</button>
			    </a>
 			   <a href="js/" >
   			     <button type="button">Learn javascript</button>
   			   </a>
     			 <button type="button" onclick="alert('버튼을 클릭했습니다!')" ;>
    				    click me</button
   			   ><br /><br />
   			   글 남기기 : <input type="text" name="userID" size="35" />
    			  <button type="submit">저장</button>
      			<button type="reset">지우기</button>
		</fieldset>
		
		<input type="submit" value="회원가입" />
	</form>
</body>
</html>
~~~



- MainServlet

~~~java
package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MainServlet extends HttpServlet {
	
	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8"); //입력 인코딩
		String sign=request.getParameter("sign");
		if(sign.equals("memberInsert")){ //회원가입 처리
			String name=request.getParameter("name");
			String ssn1=request.getParameter("ssn1");
			String ssn2=request.getParameter("ssn2");
			String country=request.getParameter("country");
			String license=request.getParameter("license");
			String habbit=request.getParameter("habbit");
			String mail=request.getParameter("mail");
			String address=request.getParameter("address");
			String mday=request.getParameter("mday");
			String mtime=request.getParameter("mtime");
			String favorite=request.getParameter("favorite");
			
			// 콘솔에 출력
			System.out.println(name+":"+ssn1+"-"+ssn2);
			System.out.println(country);
			System.out.println(license);
			System.out.println(habbit);
			System.out.println(mail);
			System.out.println(address);
			System.out.println(mday);
			System.out.println(mtime);
			System.out.println(favorite);
			
			response.setContentType("text/html;charset=utf-8"); //출력 인코딩
			PrintWriter buffer=response.getWriter(); // 브라우저 화면에 출력
			buffer.append(name+"님 가입되셨습니다.");
		}
	}


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

}
~~~



- index.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>첫페이지</title>
	<!--  <link rel="stylesheet" type="text/css" href="style01.css">-->
	<style>
		@import "style01.css";
		table {
		     	height: 200px;
  				width: 50%;
 				background-color: powderblue;
				}
	</style>
</head>
<body >
	<a href="memberInsert.html"><h3>회원가입</h3></a>
	<table border="1">
	<tr><td colspan="3">title</td></tr>
	<tr><td>menu</td><td>content</td><td>banner</td></tr>
	<tr><td>copyright</td><td colspan="3"></tr>
	</table>

</body>
</html>
~~~



- style.css

~~~css
	h3{background: #ff0235; color:white; text-align:center; }
~~~




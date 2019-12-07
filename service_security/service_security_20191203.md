2019.12.03. 



# IT서비스와 보안

## 1. 보안 약점과 취약점

보안약점과 취약점



### - 보안 약점(Weakness)

- 문제가 발생 할 수 있는 <u>원인</u> (내재된 문제) => CWE (발견된 원인을 볼 수 있는 곳)

  

### - 보안 취약점(unabilty)

- 문제점의 <u>결과</u> (공격자가 사용한 SQL 코드 등) => CVE (제품들의 문제점)



## 2. HTTP의 인증 방식

HTTP의 인증방식은 대표적으로 기본인증 방식과 폼 기반 인증 방식이 있다.



### - HTTP 기본인증 (Basic Authentication)

```
        Client ----------------------------------------------------------> Server
               Get / HTTP/ 1.1
               <----------------------------------------------------------
                                                HTTP/ 1.1 401 Unauthorized (인증정보 필요)
                  WWW-Authenticate: Basic realm="Acess to the staging site"
 Ask user =>   ---------------------------------------------------------->
               GET / HTTP/1.1
               Authorization: Basic YWxhZGTphkpvcGVuc2VzYWlI
               <----------------------------------------------------------  <= Check 
                                                           HTTP/1.1 200 Ok     credentials
                                                                        or
                                                    HTTP/1.1 403 Forbidden
```

- 단점

  - 인증정보를 BASE64로 인코딩해서 전송(디코딩 시 정보노출 됨)

  - 세션을 유지하지 않는다 (=> 매 요청 시 해당 정보 서버로 전달 => 인증 정보 노출이 빈범함으로 유출 가능성이 높아짐)

     => 단점을 보완한 것이 세션을 유지하는 인증방식 인 Form-based Authentication (폼 기반 인증)
     
     

### - 폼 기반 인증 (Form-based Authentication)

~~~
ID : _______ ----------------------> login.do?id=____&pw=____ -----------> 일치하는 정보를 조회
PW : _______                          일치하는 정보가 존재하면 SessionID를
     [login]                          생성하고 사용자 관련 정보를 세션에 저장
              Set-Cookie : SID=1234
             <----------------------
              Cookie: SID=1234
             ---------------------->  클라이언트가 전달한 세션ID를 이용해서
                                      사용자를 식별해서 서비스를 제공
~~~

- 특징

  - 인증정보가 인증할 때 한번만 전달

    => 인증 처리 과정을 안전하게 구현(제공)하면 인증 정보 노축을 막을 수 있다.

    => 서버에서 사용자를 구분 (식별) 하는데 사용되는 세션ID의 생성 및 관리가 중요함!

- SID의 생성 규칙은 유추 할 수 없어야 한다.

- 정보보안기사 문제에 나오는 SID 관련 문제는 그래프와 그래프의 패턴이 나온다

## 3. HTTP의 구조

HTTP는 요청과 응답으로 이루어져 있다.



### - HTTP의 요청 구조

~~~
 시작  POST /openeg HTTP/1.1↳                 ⇐ 방식 URI(URL) 프로토콜/버전
 헤더  Referer: /abc.html↳                    ⇐ 요청이 발생한 위치 → CSRF 취약점 방어를 위해 사용
      Cookie: role=user;↳                    ⇐ 서버로부터 부여받은 값을 서버로 전송 
             :
      Content-Length: 28↳                    ⇐ 요청 본문의 길이
      Content-Type: x-www-form-urlencoded↳   ⇐ 본문 내용의 인코딩 방식을 명시 
      ↳
(본문) name=hong&age=24& 
~~~

- HTTP의 끝은 개행문자로 구분한다 (개행문자 = 줄바꿈문자 = CR + LF = ↳ )

  

### - HTTP의 응답 구조

~~~
시작  HTTP/1.1 200 OK↳         ⇐ 프로토콜/버전 상태코드 상태설명 
헤더  Set-Cookie: role=user↳   ⇐ 쿠키를 설정
     Location: main.do↳       ⇐ 리다이렉트할 주소를 설정
             :
     Content-Type: text/html↳ ⇐ 본문의 인코딩 방식을 설정
     Content-Length: 2048↳    ⇐ 본문의 길이
     ↳                        ⇐ 응답 헤더의 끝은 한 줄 띄우는 것 = 개행문자가 2번 연속 (실제로는 공백 표시)
본문 <html><head>...</head><body>...</body></html>

~~~



### - HTTP 응답 분할

- 외부의 입력값을 응답헤더의 값으로 쓸 수 있는 경우

- 외부 입력값에 개행문자 포함 여부를 확인하지 않고 응답헤더의 값으로 사용했을 때 발생

  => 응답이 여러개로 분할되어서 브라우저로 전달

  => 분할된 응답의 본문 영역에 실행 가능학 코드를 삽입하여 사용자 브라우저를 공격에 활용

~~~
시작 HTTP/1.1 200 OK↳
헤더 Set-Cookie: role=user↳
     Location: (main.do↳ … ↳↳ … <script> … </script> ↳HTTP/1.1 200 OK↳) … ↳
             :
     Content-Type: text/html↳
     Content-Length: 2048↳
     ↳
본문 <html><head>...</head><body>...</body></html>



HTTP/1.1 200 OK↳Set-Cookie: role=user↳Location: (main.do↳ … ↳↳ … <script> … </script> ↳HTTP/1.1 200 OK↳) … ↳        :    Content-Type: text/html↳Content-Length: 2048↳↳<html><head>...</head><body>...</body></html>

()은 응답이 분할되어서 삽입된 부분
~~~

- 상태코드
  - 1xx : 정보
  - 2xx : 상태 (ex. 200 ok)
  - 3xx : 리다이렉트 또는 포워드 ( ex. 302 moved tmp)
  - 4xx : Client side error
  - 5xx : Server side error



### - HTTP 방식

- 본문 : 클라이언트가 서버로 전달하는 내용 => 요청 방식에 따라서 유무가 결정

- 방식(Method) = 클라이언트가 서버에 전달하는 명령어
  - GET = 서버에게 자원을 요청. 요청 처리에 필요한 값을 주소에 포함해서 전달
  - POST = 서버에게 자원을 요청. 요청 처리에 필요한 값을 요청 본문에 포함해서 전달
  - OPTIONS
  - HEAD
  - PUT
  - DELETE

- URI = URL(주소) + URN(고유이름)

- URL => <u>http</u>://<u>www.naver.com</u>:<u>80</u>/<u>subdir/file.html</u>?<u>parmeter1=value1&parameter2=value2</u>#<u>fragment</u>

  ​              스킴             호스트          포트      경로 및 파일                                   파리메터                               문서내 위치

- Boundary => &___& 로 표현하기 어려울 때 사용

~~~
POST /openeg/board/write.do HTTP/1.1
Host: localhost:8080
Proxy-Connection: keep-alive
Content-Length: 596780
Cache-Control: max-age=0
Origin: http://localhost:8080
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarycAuBDJChphi8zsqT
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36
Sec-Fetch-User: ?1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Referer: http://localhost:8080/openeg/board/write.do
Accept-Encoding: gzip, deflate, br
Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
Cookie: JSESSIONID=44D144679DBDA4CD18B6413DA5582F09
⇐ 요청헤더의 끝
------WebKitFormBoundarycAuBDJChphi8zsqT
Content-Disposition: form-data; name="subject"

this is title
------WebKitFormBoundarycAuBDJChphi8zsqT
Content-Disposition: form-data; name="writer"

------WebKitFormBoundarycAuBDJChphi8zsqT
Content-Disposition: form-data; name="writerId"

admin' #
------WebKitFormBoundarycAuBDJChphi8zsqT
Content-Disposition: form-data; name="content"

this is content 
———WebKitFormBoundarycAuBDJChphi8zsqT
Content-Disposition: form-data; name="file"; filename="ZoomIt.exe"
Content-Type: application/x-msdownload

MZ ⇐ 첨부파일의 내용
~~~



### - 루디 어택 (Rudy Attack) : https://crefunx.tistory.com/35

- R-U-Dead-Yet의 약자

- Dos의 일종 긴 문자열 헤더를 보내고 1Byte 씩 서버에 전송

    => 본문에 의한 공격
    
    

### - 슬로우리스 어택(Slowloris Attack) : https://crefunx.tistory.com/34

- 헤더를 종결하지 않고 Server Timeout 전 헤더에 내용을 추가하여 전송

=> 헤더에 의한 공격



### - netcat을 이용한 요청/응답 구조 확인

1. 명령 프롬프트(cmd.exe)를 실행 후 netcat 압축 해제한 폴더로 이동
2. C:\SecureCoding\start_securecoding.bat 실행 후 이클립스에 Tomcat 서버를 구동
3. 브라우저에서 http://localhost:8080/openeg 접속 → http://localhost:8080/openeg/login.do
4. 동일 과정을 netcat을 이용해서 요청  명령 프롬프트에서 아래 순서대로 입력

~~~
C:\SecureCoding\netcat>nc localhost 8080    ⇐ localhost 8080 접속(연결)
GET /openeg HTTP/1.0↳           ⇐ 요청 시작
↳                               ⇐ 요청 헤더의 끝 
HTTP/1.1 302 Moved Temporarily   ⇐ 응답 시작
Server: Apache-Coyote/1.1        ⇐ 응답 헤더 (시작)
Location: http://127.0.0.1:8080/openeg/
Date: Tue, 03 Dec 2019 04:37:21 GMT
Connection: close                
                                 ⇐ 응답 헤더 (끝)


#5 리다이렉션 주소로 다시 요청
C:\SecureCoding\netcat>nc localhost 8080 ⇐ 연결
GET /openeg/ HTTP/1.0 ⇐ 요청 시작
⇐ 요청 헤더 끝
HTTP/1.1 200 OK ⇐ 응답 시작
Server: Apache-Coyote/1.1 ⇐ 응답 헤더 시작
Accept-Ranges: bytes
ETag: W/"140-1399105434000"
Last-Modified: Sat, 03 May 2014 08:23:54 GMT
Content-Type: text/html
Content-Length: 140
Date: Tue, 03 Dec 2019 04:42:04 GMT
Connection: close
⇐ 응답 헤더의 끝
<!DOCTYPE html> ⇐ 응답 본문 시작
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh"
           content="0;url=login.do">
</head>
</html> ⇐ 응답 본문 끝 (140바이트)
 

#6 login.do 다시 요청
C:\SecureCoding\netcat>nc localhost 8080
GET /openeg/login.do HTTP/1.0

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Set-Cookie: JSESSIONID=DB3534F1F37D3CE153FE247556478C3E; Path=/openeg
Content-Type: text/html;charset=UTF-8
Content-Language: ko-KR
Content-Length: 3681
Date: Tue, 03 Dec 2019 04:43:55 GMT
Connection: close

⇐ 응답 본문 시작 



<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>
<link href="/openeg/css/main.css" rel="stylesheet"
        type="text/css">



<script type="text/javascript">
        function checkErrCode(){
                var errCode = "";
                if(errCode != null || errCode != ""){
                        switch (errCode) {
                        case 1:
                                alert("媛?낅맂 ?ъ슜?륤D媛 ?꾨떃?덈떎!");
                                break;
                        case 2:
                                alert("鍮꾨?踰덊샇媛 ?쇱튂?섏? ?딆뒿?덈떎!");
                                break;
                        case 4:
                                alert("濡쒓렇?명썑???ъ슜媛?ν빀?덈떎.");
                                break;
                        case 3:
                                alert("?뚯썝媛??泥섎━媛 ?꾨즺?섏뿀?듬땲?? 濡쒓렇????二쇱꽭??");
                                location.href =
                                        "/openeg/login.do";
                                break;
                        }
                }
        }
</script>
</head>
<body onload="checkErrCode()">
        <div id="container">

                <h1>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script>
    function confirmInitDB() {
        if ( confirm("?뺣쭚 珥덇린???섏떆寃좎뒿?덇퉴?")  ) {
                return true;
        } else {
                return false;
        }
    }
</script>
</head>

<body>
    <div id="header">
                <p class="page_header">
                      openeg.co.kr
                </p>
        </div>
        <div id="navigation">
                <ul>
                        <li><a href="/openeg/index.html">?덉쑝濡?/a></li>
                        <li><a href="/openeg/board/list.do">寃뚯떆??/a></li>
                        <li><a href="/openeg/test/test.do?no=0">蹂댁븞肄붾뵫?뚯뒪??/a></li>
                        <li><a href="/openeg/test/esapi_test.do">ESAPI ?뚯뒪??/a></li>
                        <li><a href="http://openeg.co.kr" target="_blank">OpenEG</a></li>
                        <li><a href="http://cafe.naver.com/sunschool" target="_blank">SunSchool</a></li>
                        <li><a href="/openeg/test/init_db.do?id="  onclick="return confirmInitDB();">DB珥덇린??/a></li>
                </ul>
        </div>
</body>
</html>
                </h1>


                <div id="content-container">
                        <div id="content">



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>濡쒓렇???섏씠吏</title>
<link rel="stylesheet" type="text/css" href="main.css">
</head>

<body>
   <img src="img/spring.jpg" width="500" height="400">
</body>
</html>

                        </div>
                    <div id="aside">


                                <form action="login.do" method="post">
                                        <fieldset>
                                                <center>
                                                        <label for="userId">硫붿씪二쇱냼 : </label> <input type="text"
                                                                id="userId" name="userId" class="loginInput" value="" />
                                                        <span class="error"></span><br />
                                                        <label for="userPw">鍮꾨?踰덊샇 : </label> <input type="password"
                                                                id="userPw" name="userPw" class="loginInput" /> <span
                                                                class="error"></span><br />
                                                        <br /> <input type="submit" value="濡쒓렇?? class="submitBt" /> <input
                                                                type="button" value="?뚯썝媛?? class="submitBt"
                                                                onClick='window.open("member/join.do","_blank","width=400,height=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no");' />
                                                </center>
                                        </fieldset>
                                </form>             </div>
                        <div id="footer">

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

</head>
<body>
                <p>
                Copyright (C) 源?곸닕(yskim@openeg.co.kr), 2014
                </p>
</body>
</html>
                        </div>
                </div>
        </div>

</body>
</html>
</html>
                        </div>
                </div>
        </div>

</body>
</html>

~~~



- OPTIONS 방식을 이용해서 서버가 제공하는 방식(Method)을 확인

~~~
C:\SecureCoding\netcat>nc localhost 8080
OPTIONS / HTTP/1.0

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Allow: GET, HEAD, POST, PUT, DELETE, OPTIONS
Content-Length: 0
Date: Tue, 03 Dec 2019 04:47:48 GMT
Connection: close


#8 HEAD 방식을 이용해서 login.do를 요청
C:\SecureCoding\netcat>nc localhost 8080
HEAD /openeg/login.do HTTP/1.0

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Set-Cookie: JSESSIONID=C7E87D77105C46295581E401073FDBBE; Path=/openeg
Content-Type: text/html;charset=UTF-8
Content-Language: ko-KR
Content-Length: 3681
Date: Tue, 03 Dec 2019 04:52:28 GMT
Connection: close


#9 /openeg/hello.html 문서를 생성
C:\SecureCoding\netcat>nc localhost 8080 ⇐ 연결
PUT /openeg/hello.html HTTP/1.0 ⇐ 요청 시작
Content-Type: text/html ⇐ 요청 헤더 시작
Content-Length: 31
⇐ 요청 헤더 끝
<HTML><BODY>HELLO</BODY></HTML> ⇐ 요청 본문
HTTP/1.1 403 Forbidden ⇐ 응답 시작          ⇐ 해당 서버에 쓰기 권한이 없기 때문에 
Server: Apache-Coyote/1.1                       파일을 생성할 수 없다. 
Content-Type: text/html;charset=utf-8
Content-Length: 964
Date: Tue, 03 Dec 2019 05:10:06 GMT
Connection: close

<html><head><title>Apache Tomcat/6.0.24 - Error report</title><style><!--H1 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:22px;} H2 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:16px;} H3 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:14px;} BODY {font-family:Tahoma,Arial,sans-serif;color:black;background-color:white;} B {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;} P {font-family:Tahoma,Arial,sans-serif;background:white;color:black;font-size:12px;}A {color : black;}A.name {color : black;}HR {color : #525D76;}--></style> </head><body><h1>HTTP Status 403 - </h1><HR size="1" noshade="noshade"><p><b>type</b> Status report</p><p><b>message</b> <u></u></p><p><b>description</b> <u>Access to the specified resource () has been forbidden.</u></p><HR size="1" noshade="noshade"><h3>Apache Tomcat/6.0.24</h3></body></html>

~~~



- 파일 쓰기 권한 부여

~~~
 <servlet>
        <servlet-name>default</servlet-name>
        <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
        <init-param>
            <param-name>debug</param-name>
            <param-value>0</param-value>
        </init-param>
        <init-param>
            <param-name>listings</param-name>
            <param-value>false</param-value>
        </init-param>
        <init-param>
            <param-name>readonly</param-name>
            <param-value>false</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>


저장(Ctrl + S) 후 서버 재기동


#11 #9 작업을 다시 실행
C:\SecureCoding\netcat>nc localhost 8080
PUT /openeg/hello.html HTTP/1.0
Content-Type: text/html
Content-Length: 31

<HTML><BODY>HELXX</BODY></HTML>
HTTP/1.1 201 Created                     ⇐ 파일이 생성되었음
Server: Apache-Coyote/1.1
Content-Length: 0
Date: Tue, 03 Dec 2019 05:20:03 GMT
Connection: close

~~~



## 4. 리다이렉트

요청을 다른 요청으로 변경 함



### - HTTP 프로토콜을 이용한 리다이렉트

~~~
 login     GET /login.do?id=aaa&pw=bbb HTTP/1.1
ID: ____   ----------------------------------------> login.do <--- DB 조회 ---> 
PW: ____                                                 일치하는 결과가 있으면 
                             HTTP/1.1 302 Move Temp.
                                  Location: main.do
           +-----------------<---------------------   response.sendRedirect("main.do"); 
           |    GET /main.do HTTP/1.1
           +----------------->--------------------+   main.do
                HTTP/1.1 200 OK                   |
   main    <-----------------<--------------------+
~~~



### - HTML 메타태그를 이용한 리다이렉트

~~~
<meta http-equiv="refresh" content="0;url=_______">
~~~



### - JAVASCRIPT를 이용한 리다이렉트

~~~
<script>
     location.href = "________";
</script>
~~~



### - 포워딩

~~~
 login     GET /login.do?id=aaa&pw=bbb HTTP/1.1
ID: ____   ----------------------------------------> login.do <--- DB 조회 ---> 
PW: ____                                             
                                                     일치하는 결과가 있으면 
                                                        | 
                HTTP/1.1 200 OK                         |
   main    <-----------------<----------------------  main.do

- 중간과정 없이 내부적으로 넘김 => 요청주소가 그대로 나타남 (최초요청 값으로 완료가능)
~~~



### - Open Redirect

- 리다이렉트 기능이 제공될 때, 외부 입력 값을 검증, 제한하지 않고 리다이렉트 주소로 사용하는 경우에 발생

  => 의도하지 않은 사이트로 리다이렉트 발생

  => 피싱과 같은 공격에 악용

  ex.) http://localhost:8080/openeg/redirect.jsp?.url=http://naver.com

  ​       => openeg를 거치지 않고 naver로 이동 됨

  

### - 위험한 형식 파일 업로드  : https://myanjini.tistory.com/86

- 파일 업로드 기능 구현 시 주의 사항

  1. 파일 크기와 갯수를 제한한다. (서버연결자원, 디스크 고갈 => 서비스 방해)

  2. 파일 종류를 제한 => (a) 서버 실행 가능한 파일이 업로드되면 해당 파일을 실행하여 서버의 제어권을 탈취하거나, 악성 코드의 유포지로 악용 될 수 있음

  3. (a)와 같은 경우를 방어하기 위해서는 업로드 파일은 외부에서 접근할 수 없는 경로에 저장

  4. 업로드 파일의 저장 경로와 파일명을 외부에서 알 수 없도록 처리 => 경로를 모르면 실행 불가

  5. 업로드 파일 실행 속성 제거

     

## 5. 브라우저의 보안 기능

웹은 교차 기원요청이 가능하다. => 기원이 달라도 사용가능하다 (URL 앞부분이 달라도 사용가능)

origin = 기원 = 출처 => 스킴 + 호스트 + 포트



### - SOP(Same Origin Policy) = 동일 기원(출처)정책

- JAVASCRIPT를 이용하여 자원을 가져오는 경우, 동일 기원에 대해서만 허용한다.

  => Client Web Browser에서 막음 = 출처를 알 수 없는 사용자 install 불가랑 비슷

~~~
Access to XMLHttpRequest at 'https://pm.pstatic.net/js/c/jindo_v190909.js' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
~~~



### - CORS (Cross - Origin Resource Sharing) = 교차 기원 자원공유

- SOP정책을 완화

  => 스크립트에 Access-Control-Allow-Origin *을 추가하여 검증된 스크립트 임으로 실행해도 된다는 것을 보증



### - XSS(Cross-Site Scipring) = 크로스사이트 스크립트

- 공격자가 전달한 스크립트 코드가 사용자 브라우저를 통해서 실행

​       => 사용자 브라우저 or PC정보를 탈취

​       => 가짜 Page를 만들고, 사용자 입력을 유도하여 정보 탈취

​       => 원격 PC조종 => 제어권 탈취 => BEef



- XSS의 종류

  - 반사XSS = Reflective XSS

    => 요청이 다음 화면 출력을 위해서 사용되는 경우 발생

    ~~~
    ID 중복 체크
    ID: abc<script>...</script>[search]----------->search.jsp?id=abc<script>...</script>
                                                   ~~~~~~~~~~ 
    "abc<script>...</script>"는 존재…  <-----------"<%=request.getParameter("id")%>"는 존재… 
    
    아래와 같은 공격문자열을 만들어서 불특정 다수에게 메일 또는 SMS와 같은 방식으로 전파
    <a href="http://localhost:8080/openeg/redirect.jsp?id=abc<script>alert('xss')</script>">...</a>
    ~~~

    

  - 저장XSS = Stored XSS

    => 공격자가 전달한 스크립트 코드가 취약한 서버에 저장되고 지속적으로 사용자에게 전달되는 경우 → 게시판

    => 특징 : 공격자 구분불가 => 피아식별 불가 (외부인 소행인지 개발자 소행인지 알 수 없음)

    ~~~
    공격자(글쓰기)             -------------------------------> 글저장(DB)
    <script> … </script>                   <script> … </script>
                                                           ㅣ
    희생자(글보기)                                            ㅣ
    <script> … </script>   <-------------------------------+ 
    
    ~~~

    
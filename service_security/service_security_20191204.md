2019.12.04.

# IT서비스와 보안

## 1. XSS 완화 기법

xss 완화 기법에는 입력 검증과 출력 필터링이 있다.

## - 입력검증

- 입력에 스크립트가 있는지 확인하는 기법이다.

  => 입력을 안전한 형태로 바꾼다. (=> HTML 인코딩/ 브라우저에 의미가 있는 특수문자를 이스케이필)



## - 출력 필터링

- 입력은 그래로 받고 출력 시 인코딩을 한다.

  => 예상하지 못한 경로로 입력되는 경우가 있기 때문에 중요함!

  => 공격자는 내가 원하는 형태로 입력하지 않음 (Script, Html, Css 등 다양한 형태로 공격)

- XSS가 막기 힘든이유
  
  - 선별적으로 해야한다. (사용하고자 하는 스크립트와 공격 스크립트를 구별하여 선별해야 함.)



## 2. CSP(Content Security Policy) = 컨텐츠 보안 정책

모질라가 개발한 표준

- XSS 공격은 브라우저가 애플리케이션에 속한 스크립트와 제삼자가 악의적으로 주입한 스크립트를 구분하지 못한다는 문제점을 악용(악성 스크립트를 누가 만든건지 식별하기 위함 = 피아식별이 불가)

- 서버에서 제공하는 모든 것을 맹목적으로 신뢰하는 대신, 신뢰할 수 있는 콘텐츠 소스의 허용 목록을 생성할 수 있게 해주는 Content-Security-Policy HTTP 헤더를 정의하고 브라우저에는 이런 소스를 받은 리소스만 실행하거나 랜더링할 것을 지시 (서버에 무언가 요청하면, 서버가 헤더나 본문에 있는 CSP에 목록을 넣어서 브라우저로 전달 > 브라우저에서 목록에 있는 스크립트만 메모리에 올려 실행)

- ex.) C-S-P: script-src ‘self’ https://apis.google.com  => 디렉티브(directive)
   - 브라우저는 현재 페이지의 출처뿐 아니라 HTTPS를 통해 apis.google.com에서 제공되는 자바스크립트만 다운로드 해 실행
     => ‘self’ = 동일 기원에서 가져온 것만 사용하겠다.
     => 정의되지 않은 출처의 코드에 대해서는 오류를 발생

~~~
Content-Security-Policy: default-src 'none'; script-src 'self' ssl.google-analytics.com 'sha256-xzi4zkCjuC8lZcD2UmnqDG0vurmq12W/XKM5Vd0+MlQ='; style-src 'self' maxcdn.bootstrapcdn.com fonts.googleapis.com; font-src fonts.gstatic.com maxcdn.bootstrapcdn.com; img-src 'self' ssl.google-analytics.com;
~~~

~~~
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    
<% 
	// HTTP 응답 헤더에 CSP를 추가
	// response.setHeader("Content-Security-Policy", "img-src 'self'");
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">

<!-- 메타 태그를 이용한 CSP 적용 -->
<meta http-equiv="Content-Security-Policy" content="img-src 'self'; script-src 'nonce-abcd';">

<title>Insert title here</title>
</head>
<body>
	
      <!-- 외부에서 가져오는 이미지 -->
	<img src="https://unsplash.it/300/200" alt="CSP Should Block This Image From Loading">

      <!-- 동일 서버에서 가져오는 이미지 -->
	<img src="/openeg/img/spring.jpg" />

	<!-- 실행을 허가하는 스크립트 -->
	<script nonce="abcd">
		alert("OK");
	</script>
	
	<!-- 실행을 불허하는 스크립트 -->
	<script>
		alert("NO");
	</script>

</body>
</html>
~~~



## 3. 입력값 제한 방식

입력값을 제한하는 방식은 허용 목록과 제한 목록이 있다.

### - 허용 목록(White List)

- 안정성이 보장되는 것들만 리스트 해 놓고 사용함

- 입력값이 바뀌더라도 동일한 보안성 유지가능

- 꾸준한 업데이트 필요

  

### - 제한 목록(Black List)

- 시스템에 위험성이 큰 것들을 제한 해 놓고 사용하지 않음
- 블랙리스트 사용이 위험한 입력이 들어 올 수 있음
- 블랙리스트를 사용하는 경우 => 모집합이 너무 크고, 변화가 많을 때 (ex. 공항 안면대조)



## 4. 웹 보안을 높이는 방법

웹 보안을 높이기 위해서는 인라인 스크립트를 사용하지 않고 CSP기능을 활용한다.

- 인라인 스크립트를 사용하지 않는다. (인라인 스크립트는 피아식별이 불가함 => CSP는 기본적으로 인라인 스크립트를 막음)

- CSP 기능을 이용한다. (CSP는 스크립트의 해쉬값을 추출하여 개발자의 해쉬값과 비교 후 같으면 실행함)

- NONCE를 사용한다. (해쉬값이 자주 바뀌기 때문에 임의 값 NONCE만들어서 추가한다.)

  => 공격자가 NONCE값을 알면 스크립트 공격 가능



## 5. 해쉬 

해쉬는 임의의 크기를 가진 데이터를 고정된 데이터의 크기로 변환시키는 것을 말한다.

### - 해쉬의 특징

- 유일성 => 무결성 검사(접근이 허가된 사람만 접근가능) = 해쉬가 같다는 것은 입력값이 같다는 것이므로 보증가능
- 단방향성 => 인증정보를 저장 및 처리
- 빠른연산
- 입력이 출력에 수렴한다. (= 다른 입력임에도 불구하고 같은값이 나올 수 있음)
- 충돌회피



### - 해쉬 크래킹

- 사전대입 공격
- 무작위 공격
- 레인보우 테이블 공격



### - 해쉬 크래킹 방어기법

- 패스워드의 길이를 늘린다. (패스워드가 길면 사용자의 패스워드 분실 빈도가 높아짐 그러므로 "salt"를 이용 사용자의 패스워드와 임의 값을 붙여 늘려준다.)



### - 덧

- 알고리즘이 안전하다. = 비도(안전강도)가 높다 / 비도는 키 길이에 비례함 but! 비도가 높으면 효율성이 떨어진다.

  => 비도는 키의 길이로 결정한다.

- 인코딩/디코딩 : 일정한 규칙으로 값을 대체, 치완, 전위(ex.성경의 페이지수로 암호 전달 등)



## 6. 암호화 방식

키운영 방식에 따라 대칭키 암호화 방식과 비대칭키 암화 방식으로 분류한다.

### - 대칭키 암호화 방식

- 대칭키 암호화 방식 = 암호화 키와 복호화 키가 동일
- 유일키, 비밀키, 관용 암호화 방식
- 단점 : 키 분배 및 관리의 문제가 생김

~~~
 A                                 B
data
 +
skey ---------???---------------> skey    <= 상대방에게 비밀키를 어떻게 전달할 것인가? -> 키 분배의 문제
E(data) ------------------------> E(data)
~~~

~~~
  A      ----------------> B    ⇒ 통신 대상에 비례하여 키를 관리해야 한다. 
       skey_ab                     → 키 관리의 문제 
         ----------------> C
       skey_ac  
         ----------------> D       
       skey_ad 

~~~



### - 비대칭키 암호화 방식

- 대칭키의 단점을 개선 함

- 암호화, 복호화에 쓰이는 키가 상이함

- 개인키 + 공개키, 공개키는 외부에 오픈

- 기밀성 보장 방법

  - (송신측) 수신자의 공개키를 암호화하고,
  - (수신측) 수신자의 개인키로 복호화

- 인증, 원본증명, 부인방지를 보장하는 방법

  - (송신측) 송신자의 개인키로 복호화 => (전자)서명
  - (수신측) 송신자의 공개키로 복호화 => (서명)검증

- 단점

  - 속도가 느리다. (대칭키 암호화 방식과 약 1000배의 속도차이)

    => 키 교환 후 교환된 키로 암호화, 복호화 함
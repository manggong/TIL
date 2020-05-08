# Spring

추상 메소드는 오버라이딩이 필수 사항

## 계획

### Spring F/W

- DI, Spring-Test, Mybatis, AOP, Spring MVC(JSP, JSTL)
- Rest Service (JSON, XML)

### Spring boot

- JPA, Spring, MVC(Thymeleaf)

### 패키지 네이밍 룰

- kbstar.cms.dao (data access object, db연결)
- .service (biz logic)
- .controller(front end와 back end 연결)
- .vo(value object)/entity/dto(data transfer object)/javabeans
- .exception (예외처리)
- .mapper
- 패키지 네임은 소문자로 작성

### Cat 객체를 생성하는 3가지 방법

1. Cat cat1 = new Cat();
   - 자신의 타입 그대로 하위 클래스 생성
2. Pet cat2 = new Cat();
   - Pet꺼 사용가능
3. Animal cat3 = new Cat();
   - Animal꺼 사용가능

=> 메소드 호출의 범위가 달라 짐

### 인터페이스는 왜 써야 하는가?

- 인터페이스의 역활
  - 특정 DB에 종속적인 프로그래밍을 지양함 => 벤더 중립적이다. => 구현 클래스는 DB가 만듦
- 그래서 추상메소드는 반드시 오버라이딩 해야함 => 벤더사들이 제공하니까
- JDBC 드라이버등이 메소드를 가지고 있는 파일임
- 결론, 강제성을 부여하면서 벤더가 동일한 메소드를 사용해서 구현을 하게 함
- 개발자 측면에서는 구현체랑은 상관없이 인터페이스만 보고 코딩하면 됨
- 객체를 생성해주는 메소드 = 팩토리 메소드

### 이클립스 단축키

- ctrl + s : save
- ctrl + shift + o : auto import
- ctrl + spacebar : code assist
- ctrl + shift + f : code format

### MAVEN

: pom.xml

### F/W, 라이브러리의 차이점

- 프레임 워크는 모양자 같은 거 바운더리를 잡아주고 그 범주 안에서 개발을 할 수 있게 함
- 단점 : 프레임워크를 공부해야 함
- 통제하는 주체가 누구인가!!!(흐름의 제어를 누가하는가)
- 라이브러리는 객체생성을 사용자(개발자)가 함
- 프레임워크는 클래스만 만들어 놓고 개체를 생성하고 통제는 프레임워크가 함

### 디자인패턴

- 가이드라인을 말함
- GoF 패턴(Gang of Four)
  - eric gamma

### WAS(Web Application Server)

- Web Container + EJB Container => J2EE API 구현체, 미들웨어

### Spring

- EJB를 사용하지 않고(WAS 없이도) Java기반 엔터프라이즈 어플리케이션을 POJO(Plain Old Java Object) 기반으로 작성할 수 있도록 해주겠다.
